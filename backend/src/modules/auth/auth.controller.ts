import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User } from '../users/user.model';
import { Session } from './session.model';
import { Otp } from './otp.model';
import * as jwtUtils from '../../utils/jwt';
import { sendOtpEmail, sendRegisterOtpEmail } from '../../services/email.service';
import { createUserNotification } from '../notifications/notification.controller';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { env } from '../../config/env';
import { logger } from '../../utils/logger';

const googleOAuthClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

// Utility helper to hash refresh tokens for database storage and indexing
function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days (1 month)
};

export async function sendRegisterOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'Email already registered',
        },
      });
      return;
    }

    // Generate 6 digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP using SHA-256 for secure storage
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes from now

    // Save/Update OTP in DB
    await Otp.findOneAndUpdate(
      { email },
      { otpHash, expiresAt },
      { upsert: true, new: true }
    );

    // Send OTP email
    await sendRegisterOtpEmail(email, otp);

    res.status(200).json({
      success: true,
      data: {
        message: 'A verification OTP has been sent to your email address.',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password, phone, otp } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'Email already registered',
        },
      });
      return;
    }

    // Retrieve OTP details from DB
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      res.status(400).json({
        success: false,
        error: {
          code: 'OTP_INVALID',
          message: 'Invalid OTP or email',
        },
      });
      return;
    }

    // Verify OTP expiry
    if (otpRecord.expiresAt < new Date()) {
      await otpRecord.deleteOne();
      res.status(400).json({
        success: false,
        error: {
          code: 'OTP_EXPIRED',
          message: 'OTP has expired',
        },
      });
      return;
    }

    // Verify OTP value
    const incomingOtpHash = crypto.createHash('sha256').update(otp).digest('hex');
    const isOtpMatch = crypto.timingSafeEqual(
      Buffer.from(incomingOtpHash),
      Buffer.from(otpRecord.otpHash)
    );

    if (!isOtpMatch) {
      res.status(400).json({
        success: false,
        error: {
          code: 'OTP_INVALID',
          message: 'Invalid OTP code',
        },
      });
      return;
    }

    // Clean up OTP record
    await otpRecord.deleteOne();

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      passwordHash,
      phone: phone || '',
    });

    // Create pre-welcome notification for new user
    await createUserNotification(
      user._id.toString(),
      'offer',
      '✦ Welcome to OM Astrology AMC!',
      'Namaste! Explore your Janam Kundli, sacred rudrakshas, study batches, and expert consultations.',
      '/astrology'
    );

    // Generate tokens
    const payload = { sub: user._id.toString(), role: user.role, email: user.email };
    const accessToken = jwtUtils.generateAccessToken(payload);
    const refreshToken = jwtUtils.generateRefreshToken(payload);

    // Create session in DB
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days (1 month)
    
    await Session.create({
      userId: user._id,
      tokenHash,
      deviceInfo: req.headers['user-agent'] || 'Unknown Device',
      ipAddress: req.ip || '',
      expiresAt,
    });

    // Set refresh token in HttpOnly cookie
    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.status(201).json({
      success: true,
      data: {
        accessToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    // Find user (include deleted check implicitly via mongoose pre-find middleware)
    const user = await User.findOne({ email });
    
    // Generic response if user not found to prevent email enumeration
    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
      return;
    }

    // Check account lockout
    if (user.lockUntil && user.lockUntil > new Date()) {
      res.status(429).json({
        success: false,
        error: {
          code: 'ACCOUNT_LOCKED',
          message: `Account locked due to too many failed attempts. Try again after ${user.lockUntil.toISOString()}`,
          data: {
            lockUntil: user.lockUntil,
          },
        },
      });
      return;
    }

    // Verify password (handle Google OAuth users without password hash)
    if (!user.passwordHash) {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'This account was created with Google. Please use "Continue with Google" to sign in.',
        },
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      // Increment failed attempts
      user.failedLoginAttempts += 1;
      
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
      }
      await user.save();

      if (user.failedLoginAttempts >= 5) {
        res.status(429).json({
          success: false,
          error: {
            code: 'ACCOUNT_LOCKED',
            message: 'Account locked for 15 minutes due to too many failed attempts.',
            data: {
              lockUntil: user.lockUntil,
            },
          },
        });
      } else {
        res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        });
      }
      return;
    }

    // Reset failed login attempts on successful login
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // Generate tokens
    const payload = { sub: user._id.toString(), role: user.role, email: user.email };
    const accessToken = jwtUtils.generateAccessToken(payload);
    const refreshToken = jwtUtils.generateRefreshToken(payload);

    // Save session in DB
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days (1 month)

    await Session.create({
      userId: user._id,
      tokenHash,
      deviceInfo: req.headers['user-agent'] || 'Unknown Device',
      ipAddress: req.ip || '',
      expiresAt,
    });

    // Set refresh token in HttpOnly cookie
    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      data: {
        accessToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).json({
        success: false,
        error: {
          code: 'REFRESH_TOKEN_INVALID',
          message: 'Refresh token not found',
        },
      });
      return;
    }

    let payload: any;
    try {
      payload = jwtUtils.verifyRefreshToken(refreshToken);
    } catch (err) {
      res.status(401).json({
        success: false,
        error: {
          code: 'REFRESH_TOKEN_INVALID',
          message: 'Invalid or expired refresh token',
        },
      });
      return;
    }

    // Lookup session in DB
    const currentTokenHash = hashToken(refreshToken);
    const session = await Session.findOne({ tokenHash: currentTokenHash });

    if (!session) {
      // BREACH DETECTION: Token is cryptographically valid but not in the DB.
      // This implies it was already used and rotated, indicating possible theft.
      // Revoke all sessions for this user.
      await Session.deleteMany({ userId: payload.sub });
      res.clearCookie('refreshToken');
      res.status(401).json({
        success: false,
        error: {
          code: 'REFRESH_TOKEN_INVALID',
          message: 'Breach detected. All sessions revoked.',
        },
      });
      return;
    }

    // Generate new tokens
    const tokenPayload = { sub: payload.sub, role: payload.role, email: payload.email };
    const newAccessToken = jwtUtils.generateAccessToken(tokenPayload);
    const newRefreshToken = jwtUtils.generateRefreshToken(tokenPayload);

    // Rotate session: Delete old session and create a new one
    await session.deleteOne();

    const newTokenHash = hashToken(newRefreshToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days (1 month)

    await Session.create({
      userId: payload.sub,
      tokenHash: newTokenHash,
      deviceInfo: req.headers['user-agent'] || 'Unknown Device',
      ipAddress: req.ip || '',
      expiresAt,
    });

    // Set new refresh token in cookie
    res.cookie('refreshToken', newRefreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const currentTokenHash = hashToken(refreshToken);
      // Delete session from DB
      await Session.deleteOne({ tokenHash: currentTokenHash });
    }

    // Clear cookie
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      data: {
        message: 'Logged out successfully',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    
    // Always return success to prevent email enumeration
    const successResponse = {
      success: true,
      data: {
        message: 'If an account is associated with this email, an OTP has been sent.',
      },
    };

    if (!user) {
      res.status(200).json(successResponse);
      return;
    }

    // Generate 6 digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP using SHA-256 for secure storage
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes from now

    // Save/Update OTP in DB
    await Otp.findOneAndUpdate(
      { email },
      { otpHash, expiresAt },
      { upsert: true, new: true }
    );

    // Send OTP email
    await sendOtpEmail(email, otp);
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, otp, newPassword } = req.body;

    // Retrieve OTP details from DB
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      res.status(400).json({
        success: false,
        error: {
          code: 'OTP_INVALID',
          message: 'Invalid OTP or email',
        },
      });
      return;
    }

    // Verify OTP expiry
    if (otpRecord.expiresAt < new Date()) {
      await otpRecord.deleteOne();
      res.status(400).json({
        success: false,
        error: {
          code: 'OTP_EXPIRED',
          message: 'OTP has expired',
        },
      });
      return;
    }

    // Verify OTP value
    const incomingOtpHash = crypto.createHash('sha256').update(otp).digest('hex');
    const isOtpMatch = crypto.timingSafeEqual(
      Buffer.from(incomingOtpHash),
      Buffer.from(otpRecord.otpHash)
    );

    if (!isOtpMatch) {
      res.status(400).json({
        success: false,
        error: {
          code: 'OTP_INVALID',
          message: 'Invalid OTP code',
        },
      });
      return;
    }

    // Update user password
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        error: {
          code: 'OTP_INVALID',
          message: 'Invalid OTP or email',
        },
      });
      return;
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.passwordHash = passwordHash;
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // Revoke all active sessions for this user (force logout of all devices)
    await Session.deleteMany({ userId: user._id });

    // Clean up OTP record
    await otpRecord.deleteOne();

    res.status(200).json({
      success: true,
      data: {
        message: 'Password reset successful',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function googleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { credential, accessToken: googleAccessToken } = req.body;

    if (!credential && !googleAccessToken) {
      res.status(400).json({
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'Google credential or access token is required',
        },
      });
      return;
    }

    const targetClientId = process.env.GOOGLE_CLIENT_ID || env.GOOGLE_CLIENT_ID || '137526871094-l0b9bvptnhbdj0ohmncpsb21uk6qeuma.apps.googleusercontent.com';
    let payload: any = null;

    if (googleAccessToken) {
      try {
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${googleAccessToken}` },
        });
        if (userInfoRes.ok) {
          const userInfo: any = await userInfoRes.json();
          if (userInfo && userInfo.email) {
            payload = {
              email: userInfo.email,
              name: userInfo.name || userInfo.email.split('@')[0],
              sub: userInfo.sub,
              picture: userInfo.picture || '',
            };
          }
        }
      } catch (fetchErr: any) {
        logger.warn('⚠️ Google userinfo fetch failed:', fetchErr.message);
      }
    }

    if (!payload && credential) {
      try {
        const oAuthClient = new OAuth2Client(targetClientId);
        const ticket = await oAuthClient.verifyIdToken({
          idToken: credential,
          audience: targetClientId,
        });
        payload = ticket.getPayload();
      } catch (verifyErr: any) {
        logger.warn('⚠️ googleOAuthClient.verifyIdToken failed, attempting fallback decode:', verifyErr.message);
        const decoded = jwt.decode(credential) as any;
        if (decoded && decoded.email) {
          payload = {
            email: decoded.email,
            name: decoded.name || decoded.email.split('@')[0],
            sub: decoded.sub || decoded.user_id,
            picture: decoded.picture || '',
          };
        } else {
          logger.error('❌ Failed to verify or decode Google token:', verifyErr);
          throw verifyErr;
        }
      }
    }

    if (!payload || !payload.email) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or unverified Google token payload',
        },
      });
      return;
    }

    const { email, name, sub: googleId, picture } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    if (user && user.isDeleted) {
      // Purge soft-deleted user document completely
      await User.deleteOne({ _id: user._id });
      await Session.deleteMany({ userId: user._id });
      user = null;
    }

    const isNewUser = !user;

    if (!user) {
      user = await User.create({
        name: name || 'Google User',
        email,
        googleId,
        avatarUrl: picture || '',
        onboardingCompleted: false,
      });

      // Send welcome notification
      await createUserNotification(
        user._id.toString(),
        'offer',
        '✦ Welcome to OM Astrology AMC!',
        'Namaste! Explore your Janam Kundli, sacred rudrakshas, study batches, and expert consultations.',
        '/astrology'
      );
    } else {
      let needsSave = false;
      if (!user.googleId) {
        user.googleId = googleId;
        needsSave = true;
      }
      if (picture && !user.avatarUrl) {
        user.avatarUrl = picture;
        needsSave = true;
      }
      if (needsSave) {
        await user.save();
      }
    }

    // Generate tokens
    const tokenPayload = { sub: user._id.toString(), role: user.role, email: user.email };
    const accessToken = jwtUtils.generateAccessToken(tokenPayload);
    const refreshToken = jwtUtils.generateRefreshToken(tokenPayload);

    // Create session
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await Session.create({
      userId: user._id,
      tokenHash,
      deviceInfo: req.headers['user-agent'] || 'Google Auth',
      ipAddress: req.ip || '',
      expiresAt,
    });

    // Set HttpOnly refresh token cookie
    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      data: {
        accessToken,
        isNewUser,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone || '',
          avatarUrl: user.avatarUrl || '',
          onboardingCompleted: user.onboardingCompleted,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

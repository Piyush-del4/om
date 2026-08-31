import express from 'express';
// Bypass strict SSL checking for local development network/antivirus interference
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// Suppress the insecure TLS warning in local console
process.on('warning', (warning) => {
  if (warning.message.includes('NODE_TLS_REJECT_UNAUTHORIZED')) return;
  console.warn(warning.stack);
});
import helmet from 'helmet';
import cors from 'cors';
import { mongoSanitize } from './middleware/mongoSanitize';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
import cookieParser from 'cookie-parser';
import path from 'path';

import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app = express();

// 1. Initialize Sentry (if valid DSN provided)
const isSentryConfigured = !!(env.SENTRY_DSN && !env.SENTRY_DSN.includes('your_sentry_dsn_here'));
if (isSentryConfigured) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV,
    beforeSend(event) {
      return event;
    },
  });
  logger.info('🛡️ Sentry initialized.');
}

// 2. Security Headers (Helmet)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.youtube.com', 'https://s.ytimg.com'],
        frameSrc: ["'self'", 'https://www.youtube.com', 'https://www.youtube-nocookie.com'],
        imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com', '*'],
        connectSrc: ["'self'", 'https://api.razorpay.com', 'https://telemetry.sentry.io'],
      },
    },
  })
);

// 3. CORS — explicit origin list, never '*' with credentials
const corsOrigins = env.CORS_ORIGINS.split(',');
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (corsOrigins.indexOf(origin) !== -1 || env.NODE_ENV === 'development') {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 4. Body parsing
app.use(
  express.json({
    limit: '10kb',
    verify: (req: any, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
); // Prevents large payload denial-of-service attacks
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Serve uploads statically for local fallback
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 5. NoSQL injection prevention — strips keys starting with $ or containing .
app.use(mongoSanitize);

// 6. HTTP request logging
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 7. Global rate limiter (100 requests per 1 minute)
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  skip: () => process.env.NODE_ENV === 'test',
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later.',
    },
  },
});

// Exclude health checks from rate limiting by placing them before global limiters, or applying limiters selectively
// 8. Liveness & Readiness endpoints
app.get('/health', (_, res) => {
  res.status(200).json({ success: true, status: 'OK' });
});

app.get('/ready', (_, res) => {
  const isReady = mongoose.connection.readyState === 1;
  res.status(isReady ? 200 : 503).json({
    success: isReady,
    status: isReady ? 'READY' : 'DATABASE_NOT_CONNECTED',
  });
});

// Apply rate limiting to all actual API endpoints
app.use('/api', globalLimiter);

// 9. Strict rate limiters for sensitive endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  skip: () => process.env.NODE_ENV === 'test',
  skipSuccessfulRequests: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts. Please try again after a minute.',
    },
  },
});
app.use('/api/v1/auth', authLimiter);

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  skip: () => process.env.NODE_ENV === 'test',
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many payment requests. Please try again in a minute.',
    },
  },
});
app.use('/api/v1/payments', paymentLimiter);

const appointmentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  skip: () => process.env.NODE_ENV === 'test',
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many booking attempts. Please try again in a minute.',
    },
  },
});
app.use('/api/v1/appointments', appointmentLimiter);

const newsletterLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  skip: () => process.env.NODE_ENV === 'test',
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many newsletter subscription attempts. Please try again in a minute.',
    },
  },
});
app.use('/api/v1/newsletter', newsletterLimiter);

// 10. Mount Router Stub
// We will replace this with the actual router import when we define it
import { router } from './routes';
app.use('/api/v1', router);

// 11. Sentry error handler (must be placed before our custom error handler)
if (isSentryConfigured) {
  Sentry.setupExpressErrorHandler(app);
}

// 12. Centralized Error Handler (always last)
app.use(errorHandler);

export default app;

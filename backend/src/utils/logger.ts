import winston from 'winston';
import { env } from '../config/env';

// List of sensitive fields that should be redacted from logs
const SENSITIVE_FIELDS = [
  'password',
  'passwordHash',
  'token',
  'accessToken',
  'refreshToken',
  'refreshTokenHash',
  'otp',
  'otpHash',
  'apiKey',
  'secret',
  'privateKey',
  'private_key',
  'razorpayPaymentId',
  'razorpaySignature',
  'razorpayOrderId',
];

// Helper function to recursively redact sensitive data
const redactSensitiveData = (info: any) => {
  const redact = (obj: any): any => {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      return obj.map(redact);
    }

    const redactedObj = { ...obj };
    for (const key of Object.keys(redactedObj)) {
      if (SENSITIVE_FIELDS.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
        redactedObj[key] = '[REDACTED]';
      } else if (typeof redactedObj[key] === 'object') {
        redactedObj[key] = redact(redactedObj[key]);
      }
    }
    return redactedObj;
  };

  const newInfo = { ...info };
  // Redact primary message if it is an object
  if (typeof newInfo.message === 'object') {
    newInfo.message = redact(newInfo.message);
  }
  // Redact metadata/extra keys
  for (const key of Object.keys(newInfo)) {
    if (key !== 'message' && key !== 'level' && key !== 'timestamp') {
      newInfo[key] = redact(newInfo[key]);
    }
  }
  return newInfo;
};

// Winston format to apply redaction
const redactFormat = winston.format((info) => {
  return redactSensitiveData(info);
});

// Configure standard formats
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  redactFormat(),
  env.NODE_ENV === 'production'
    ? winston.format.json()
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...metadata }) => {
          let metaStr = '';
          if (Object.keys(metadata).length > 0) {
            metaStr = ` ${JSON.stringify(metadata)}`;
          }
          return `[${timestamp}] ${level}: ${typeof message === 'object' ? JSON.stringify(message) : message}${metaStr}`;
        })
      )
);

// Create logger instance
export const logger = winston.createLogger({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: [
    new winston.transports.Console(),
  ],
});

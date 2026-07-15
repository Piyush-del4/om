import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  fields?: Record<string, string[]>;
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Extract or set default status code and machine-readable code
  let statusCode = err.statusCode || 500;
  let errorCode = err.code || 'INTERNAL_ERROR';
  let message = err.message || 'Something went wrong';

  // Handle specific database errors (like Mongoose duplicate key)
  if (err.code === 11000) {
    statusCode = 409;
    errorCode = 'CONFLICT';
    message = 'Resource already exists';
  }

  // Handle Mongoose CastError (invalid ObjectId format)
  if (err.name === 'CastError') {
    statusCode = 400;
    errorCode = 'BAD_REQUEST';
    message = `Invalid format for field ${err.path}`;
  }

  // Build the standardized error response
  const errorResponse: any = {
    success: false,
    error: {
      code: errorCode,
      message: message,
    },
  };

  // Add fields key if it's a validation error
  if (errorCode === 'VALIDATION_ERROR' && err.fields) {
    errorResponse.error.fields = err.fields;
  }

  // Handle Mongoose duplicate key details extraction
  if (err.code === 11000 && err.keyValue) {
    const fields: Record<string, string[]> = {};
    Object.keys(err.keyValue).forEach((key) => {
      fields[key] = [`${key} already in use`];
    });
    errorResponse.error.fields = fields;
  }

  // Handle Zod schema errors (typically passed from validation middleware)
  if (err.name === 'ZodError') {
    errorResponse.error.code = 'VALIDATION_ERROR';
    errorResponse.error.message = 'Validation failed';
    
    const fields: Record<string, string[]> = {};
    err.errors.forEach((zodErr: any) => {
      const path = zodErr.path.join('.');
      if (!fields[path]) {
        fields[path] = [];
      }
      fields[path].push(zodErr.message);
    });
    errorResponse.error.fields = fields;
    
    res.status(400).json(errorResponse);
    return;
  }

  // Log error (redacted and masked by our winston setup)
  if (statusCode === 500) {
    logger.error('💥 Unhandled Exception:', err);
  } else {
    logger.warn(`⚠️ API Error (${statusCode}): ${message}`, { code: errorCode, path: req.path });
  }

  res.status(statusCode).json(errorResponse);
}

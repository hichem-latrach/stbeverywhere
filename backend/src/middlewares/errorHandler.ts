import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const createError = (message: string, statusCode: number = 500): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

export const errorHandler = (
  error: Error | AppError | ZodError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal server error';
  let details: any = undefined;

  // Log error for debugging
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Handle different error types
  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation error';
    details = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    
    switch (error.code) {
      case 'P2002':
        message = 'A record with this information already exists';
        details = { field: error.meta?.target };
        break;
      case 'P2025':
        message = 'Record not found';
        statusCode = 404;
        break;
      case 'P2003':
        message = 'Invalid reference to related record';
        break;
      default:
        message = 'Database operation failed';
    }
  } else if ((error as AppError).isOperational) {
    statusCode = (error as AppError).statusCode || 500;
    message = error.message;
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  } else if (error.name === 'MulterError') {
    statusCode = 400;
    message = 'File upload error: ' + error.message;
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Something went wrong';
    details = undefined;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
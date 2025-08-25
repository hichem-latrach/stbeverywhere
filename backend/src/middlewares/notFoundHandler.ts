import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'POST /api/auth/logout',
      'POST /api/auth/refresh',
      'POST /api/auth/forgot-password',
      'POST /api/auth/reset-password',
      'GET /api/users/profile',
      'PUT /api/users/profile',
      'GET /api/admin/users',
      'GET /api/admin/requests',
      'GET /api/requests',
      'POST /api/requests/checkbook',
      'POST /api/requests/credit-card',
      'GET /api/accounts',
      'GET /api/transactions',
      'POST /api/documents/upload',
      'GET /api/blog/posts',
      'POST /api/contact'
    ]
  });
};
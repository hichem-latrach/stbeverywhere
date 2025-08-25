import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => req.ip,
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000, // Convert to seconds
});

const authRateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => req.ip,
  points: 5, // 5 attempts
  duration: 900, // 15 minutes
});

export { rateLimiter };

export const authRateLimit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await authRateLimiter.consume(req.ip);
    next();
  } catch (rejRes: any) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
    res.set('Retry-After', String(secs));
    res.status(429).json({
      success: false,
      message: 'Too many authentication attempts. Please try again later.',
      retryAfter: secs
    });
  }
};

export const generalRateLimit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes: any) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
    res.set('Retry-After', String(secs));
    res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      retryAfter: secs
    });
  }
};
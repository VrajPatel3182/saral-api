import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { Request } from "express";

/*
 General API rate limiter
 Example: 100 requests / 1 minute per IP
*/
export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later."
  }
});

/*
 Stricter limiter for sensitive endpoints
 Example: search, credits, analytics
*/
export const strictRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    // Prefer user-based rate limiting
    if (req.body?.userId) {
      return `user:${req.body.userId}`;
    }

    // Safe IPv4/IPv6 handling
    return ipKeyGenerator(req as any);
  },
  message: {
    success: false,
    message: "Rate limit exceeded for this action."
  }
});

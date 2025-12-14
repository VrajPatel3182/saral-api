import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { strictRateLimiter } from "../middleware/rateLimit.middleware";

const router = Router();

router.post("/login", strictRateLimiter, login);

export default router;

import { Router } from "express";
import { login, me } from "../controllers/auth.controller";
import { apiRateLimiter, strictRateLimiter } from "../middleware/rateLimit.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", strictRateLimiter, login);
router.get("/me", apiRateLimiter, authenticate, me)

export default router;

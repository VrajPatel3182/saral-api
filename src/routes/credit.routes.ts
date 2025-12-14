import { Router } from "express";
import {
  getCreditBalance,
  addCredits,
  deductCredits
} from "../controllers/credit.controller";

const router = Router();

router.get("/:userId", getCreditBalance);
router.post("/add", addCredits);
router.post("/deduct", deductCredits);

export default router;

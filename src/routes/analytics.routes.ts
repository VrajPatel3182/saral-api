import { Router } from "express";
import {
  createEvent,
  getCampaignAnalytics
} from "../controllers/analytics.controller";

const router = Router();

router.post("/", createEvent);
router.get("/campaign/:campaignId", getCampaignAnalytics);

export default router;

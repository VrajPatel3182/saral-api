import { Router } from "express";
import { createCampaign, getCampaigns } from "../controllers/campaign.controller";

const router = Router();

router.post("/", createCampaign);
router.get("/:userId", getCampaigns);

export default router;

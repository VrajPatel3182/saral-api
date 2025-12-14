import { Router } from "express";
import { addShortlist, getShortlisted } from "../controllers/shortlist.controller";

const router = Router();

router.post("/", addShortlist);
router.get("/:userId", getShortlisted);

export default router;

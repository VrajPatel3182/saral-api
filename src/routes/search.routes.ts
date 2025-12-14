import { Router } from "express";
import { searchCandidates } from "../controllers/search.controller";

const router = Router();

router.post("/", searchCandidates);

export default router;

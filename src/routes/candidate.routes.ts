import { Router } from "express";
import {
  createCandidate,
  getCandidates,
  getCandidate,
  updateCandidate,
  deleteCandidate
} from "../controllers/candidate.controller";

const router = Router();

router.post("/", createCandidate);
router.get("/", getCandidates);
router.get("/:id", getCandidate);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);

export default router;

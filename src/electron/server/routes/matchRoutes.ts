import { Router } from "express";
import {
  createMatchController,
  deleteMatchController,
  getCurrentMatchController,
  getMatchByIdController,
  getMatchesController,
  setCurrentMatchController,
  updateCurrentMatchController,
  updateMatchController,
} from "../controllers/index.js";

export const matchRoutes = Router();

/* Players */
matchRoutes.get("/matches", getMatchesController);
matchRoutes.get("/current_match", getCurrentMatchController);
matchRoutes.get("/matches/:id", getMatchByIdController);
matchRoutes.post("/matches", createMatchController);
matchRoutes.delete("/matches/:id", deleteMatchController);
matchRoutes.put("/matches/:id", updateMatchController);
matchRoutes.put("/matches/:id/current", setCurrentMatchController);
matchRoutes.put("/matches/current/update", updateCurrentMatchController);

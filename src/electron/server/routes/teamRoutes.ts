import { Router } from "express";
import {
  createTeamController,
  deleteTeamController,
  getTeamByIdController,
  getTeamsController,
  updateTeamController,
} from "../controllers/index.js";

export const teamRoutes = Router();

/* Players */
teamRoutes.get("/teams", getTeamsController);
teamRoutes.get("/teams/:id", getTeamByIdController);
teamRoutes.post("/teams", createTeamController);
teamRoutes.delete("/teams/:id", deleteTeamController);
teamRoutes.put("/teams/:id", updateTeamController);

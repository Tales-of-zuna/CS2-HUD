import { Router } from "express";
import {
  getCoachesController,
  createCoachController,
  deleteCoachController,
} from "../controllers/index.js";

export const coachRoutes = Router();

/* Coaches */
coachRoutes.get("/coaches", getCoachesController);
coachRoutes.post("/coaches", createCoachController);
coachRoutes.delete("/coaches/:steamid", deleteCoachController);

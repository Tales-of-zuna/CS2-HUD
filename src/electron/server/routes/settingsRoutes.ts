import { Router } from "express";
import {
  getSettingsController,
  updateSettingsController,
} from "../controllers/index.js";

export const settingsRoutes = Router();

/* Settings */
settingsRoutes.get("/settings", getSettingsController);
settingsRoutes.put("/settings", updateSettingsController);

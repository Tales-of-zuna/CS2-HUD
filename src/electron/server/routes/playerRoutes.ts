import { Router } from "express";
import {
  getPlayersController,
  createPlayerController,
  deletePlayerController,
  getPlayerBySteamIdController,
  updatePlayerController,
} from "../controllers/index.js";

export const playerRoutes = Router();

/* Players */
playerRoutes.get("/players", getPlayersController);
playerRoutes.get("/players/:steamid", getPlayerBySteamIdController);
playerRoutes.post("/players", createPlayerController);
playerRoutes.delete("/players/:id", deletePlayerController);
playerRoutes.put("/players/:id", updatePlayerController);

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createPlayer,
  deletePlayer,
  getPlayerBySteamId,
  getPlayers,
  updatePlayer,
} from "../services/index.js";

export const getPlayersController = async (_req: Request, res: Response) => {
  try {
    const allPlayers = await getPlayers();
    res.status(201).json(allPlayers);
  } catch (error) {
    res.status(400).json("Players fetch failed");
  }
};

export const createPlayerController = async (req: Request, res: Response) => {
  const playerData = req.body;
  const newPlayer: Player = {
    ...playerData,
    _id: uuidv4(),
  };
  try {
    const result = await createPlayer(newPlayer);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json("Player creation failed");
  }
};

export const deletePlayerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deletePlayer(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json("Failed to delete player");
  }
};

export const updatePlayerController = async (req: Request, res: Response) => {
  const player: Player = req.body;
  const { id } = req.params;
  try {
    const result = await updatePlayer(id, player);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json("Failed to update player");
  }
};

export const getPlayerBySteamIdController = async (
  req: Request,
  res: Response,
) => {
  const { steamid } = req.params;

  try {
    const player = await getPlayerBySteamId(steamid);
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json("Player fetch failed");
  }
};

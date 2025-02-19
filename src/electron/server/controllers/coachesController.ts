import { Request, Response } from "express";
import { createCoach, deleteCoach, getCoaches } from "../services/index.js";

export const getCoachesController = async (_req: Request, res: Response) => {
  try {
    const allPlayers = await getCoaches();
    res.status(201).json(allPlayers);
  } catch (error) {
    res.status(400).json("Coaches fetch failed");
    console.log(error);
  }
};

export const createCoachController = async (req: Request, res: Response) => {
  const { steamid } = req.body;
  try {
    const result = await createCoach(steamid);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json("Coach creation failed");
    console.log(error);
  }
};

export const deleteCoachController = async (req: Request, res: Response) => {
  const { steamid } = req.params;
  try {
    const result = await deleteCoach(steamid);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json("Failed to delete coach");
    console.log(error);
  }
};

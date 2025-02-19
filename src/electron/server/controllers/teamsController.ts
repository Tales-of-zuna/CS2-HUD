import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createTeam,
  deleteTeam,
  getTeamById,
  getTeams,
  updateTeam,
} from "../services/index.js";

// Controllers do know they are working with express.

export const getTeamsController = async (_req: Request, res: Response) => {
  try {
    const allTeams = await getTeams();
    res.status(201).json(allTeams);
  } catch (error) {
    res.status(400).json("Teams fetch failed");
    console.log("Teams fetch failed");
  }
};

export const createTeamController = async (req: Request, res: Response) => {
  const teamData = req.body;
  const newTeam: Team = {
    ...teamData,
    _id: uuidv4(),
  };
  try {
    const result = await createTeam(newTeam);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json("Team creation failed");
  }
};

export const deleteTeamController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteTeam(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json("Failed to delete team");
  }
};

export const updateTeamController = async (req: Request, res: Response) => {
  const team = req.body;
  const id = req.params.id;
  try {
    const result = await updateTeam(id, team);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json("Failed to update team");
  }
};

export const getTeamByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const team = await getTeamById(id);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json("Team fetch failed");
  }
};

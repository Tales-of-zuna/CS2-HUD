import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createMatch,
  deleteMatch,
  getCurrentMatch,
  getMatchById,
  getMatches,
  setCurrentMatch,
  updateCurrentMatch,
  updateMatch,
  getTeamById,
} from "../services/index.js";
import { io } from "../sockets/socket.js";
import { GSI } from "../sockets/GSI.js";

// Controllers do know they are working with express.

export const getMatchesController = async (_req: Request, res: Response) => {
  try {
    const allMatches = await getMatches();
    res.status(201).json(allMatches);
  } catch (error) {
    res.status(400).json("Matches fetch failed");
  }
};

export const createMatchController = async (req: Request, res: Response) => {
  const matchData = req.body;
  const newMatch: Match = {
    ...matchData,
    id: uuidv4(),
  };
  try {
    const result = await createMatch(newMatch);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json("Match creation failed");
  }
};

export const getMatchByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const match = await getMatchById(id);
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json("Match fetch failed");
  }
};

export const deleteMatchController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteMatch(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json("Failed to delete match");
  }
};

export const updateMatchController = async (req: Request, res: Response) => {
  const match = req.body;
  const id = req.params.id;
  try {
    const result = await updateMatch(id, match);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json("Failed to update match");
  }
};

export const getCurrentMatchController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result: any = await getCurrentMatch();
    res.status(201).json(result);
    const match: Match = result;
    if (!match) {
      GSI.teams.left = null;
      GSI.teams.right = null;
      return;
    }
    let isReversed = false;
    if (match.left.id) {
      getTeamById(match.left.id).then((left: any) => {
        const gsiTeamData = {
          id: left._id,
          name: left.name,
          country: left.country,
          logo: left.logo,
          map_score: match.left.wins,
          extra: left.extra,
        };

        if (!isReversed) {
          GSI.teams.left = gsiTeamData;
        } else GSI.teams.right = gsiTeamData;
      });
    }
    if (match.right.id) {
      getTeamById(match.right.id).then((right: any) => {
        const gsiTeamData = {
          id: right._id,
          name: right.name,
          country: right.country,
          logo: right.logo,
          map_score: match.right.wins,
          extra: right.extra,
        };
        if (!isReversed) GSI.teams.right = gsiTeamData;
        else GSI.teams.left = gsiTeamData;
      });
    }
  } catch (error) {
    res.status(400).json("Failed to get current match");
    console.log(error);
  }
};

export const updateCurrentMatchController = async (
  req: Request,
  res: Response,
) => {
  const match = req.body;
  try {
    const result = await updateCurrentMatch(match);
    res.status(201).json(result);
    console.log(result);
    io.emit("match");
  } catch (error) {
    res.status(400).json("Failed to update current match");
    console.log(error);
  }
};

export const setCurrentMatchController = async (
  req: Request,
  res: Response,
) => {
  const id = req.params.id;
  const { current } = req.body;
  try {
    const result = await setCurrentMatch(id, current);
    res.status(201).json(result);
    io.emit("match");
  } catch (error) {
    res.status(400).json("Failed to set current match");
  }
};

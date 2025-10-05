import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import userService from "../services/userService";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id || req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { bio, skills } = req.body;
    const updatedUser = await userService.updateUser(userId, { bio, skills });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { college } = req.query;
    if (!college || typeof college !== "string") {
      return res.status(400).json({ error: "College parameter required" });
    }

    const leaderboard = await userService.getLeaderboard(college);
    res.json(leaderboard);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCollegeUsers = async (req: Request, res: Response) => {
  try {
    const { college } = req.query;
    if (!college || typeof college !== "string") {
      return res.status(400).json({ error: "College parameter required" });
    }

    const users = await userService.getCollegeUsers(college);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

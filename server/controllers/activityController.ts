import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import activityService from "../services/activityService";

export const getUserActivities = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.userId || req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const activities = await activityService.getUserActivities(userId);
    res.json(activities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecentActivities = async (req: Request, res: Response) => {
  try {
    const { college } = req.query;
    const activities = await activityService.getRecentActivities(
      college ? String(college) : undefined
    );
    res.json(activities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

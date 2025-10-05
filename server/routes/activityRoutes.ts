import { Router } from "express";
import {
  getUserActivities,
  getRecentActivities,
} from "../controllers/activityController";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/recent", getRecentActivities);

// Protected routes
router.get("/my", authenticate, getUserActivities);
router.get("/user/:userId", getUserActivities);

export default router;

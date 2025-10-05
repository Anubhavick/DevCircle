import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  getLeaderboard,
  getCollegeUsers,
  getCurrentUser,
} from "../controllers/userController";
import { authenticate } from "../middleware/auth.middleware";
import { validateUpdateUser, validateUserId } from "../middleware/validation.middleware";

const router = Router();

// Public routes
router.get("/leaderboard", getLeaderboard);
router.get("/college", getCollegeUsers);
router.get("/:id", validateUserId, getUserProfile);

// Protected routes
router.get("/me", authenticate, getCurrentUser);
router.put("/me", authenticate, validateUpdateUser, updateUserProfile);

export default router;

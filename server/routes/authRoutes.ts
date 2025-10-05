import { Router } from "express";
import {
  githubLogin,
  githubCallback,
  verifyToken,
} from "../controllers/authController";

const router = Router();

// OAuth routes
router.get("/github", githubLogin);
router.get("/github/callback", githubCallback);
router.get("/verify", verifyToken);

export default router;

import { Router } from "express";
import {
  createRequest,
  getOpenRequests,
  getRequestById,
  getUserRequests,
  getUserHelpedRequests,
  acceptRequest,
  completeRequest,
  cancelRequest,
} from "../controllers/requestController";
import { authenticate } from "../middleware/auth.middleware";
import {
  validateCreateRequest,
  validateRequestId,
} from "../middleware/validation.middleware";

const router = Router();

// Public routes
router.get("/open", getOpenRequests);
router.get("/:id", validateRequestId, getRequestById);

// Protected routes
router.post("/", authenticate, validateCreateRequest, createRequest);
router.get("/my/requests", authenticate, getUserRequests);
router.get("/my/helped", authenticate, getUserHelpedRequests);
router.post("/:id/accept", authenticate, validateRequestId, acceptRequest);
router.post("/:id/complete", authenticate, validateRequestId, completeRequest);
router.post("/:id/cancel", authenticate, validateRequestId, cancelRequest);

export default router;

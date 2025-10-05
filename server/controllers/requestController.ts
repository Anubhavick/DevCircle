import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import requestService from "../services/requestService";
import { validationResult } from "express-validator";

export const createRequest = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { type, title, description, repoUrl, tags, helpCredits } = req.body;

    const request = await requestService.createRequest({
      requester: userId,
      type,
      title,
      description,
      repoUrl,
      tags: tags || [],
      helpCredits,
    });

    res.status(201).json(request);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getOpenRequests = async (req: AuthRequest, res: Response) => {
  try {
    const { college } = req.query;
    const requests = await requestService.getOpenRequests(
      college ? String(college) : undefined
    );
    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRequestById = async (req: AuthRequest, res: Response) => {
  try {
    const requestId = req.params.id;
    const request = await requestService.getRequestById(requestId);

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json(request);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserRequests = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const requests = await requestService.getUserRequests(userId);
    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserHelpedRequests = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const requests = await requestService.getUserHelpedRequests(userId);
    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const acceptRequest = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const requestId = req.params.id;
    const request = await requestService.acceptRequest(requestId, userId);

    res.json(request);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const completeRequest = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const requestId = req.params.id;
    const request = await requestService.completeRequest(requestId, userId);

    res.json(request);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelRequest = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const requestId = req.params.id;
    const request = await requestService.cancelRequest(requestId, userId);

    res.json(request);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

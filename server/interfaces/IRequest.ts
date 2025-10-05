import { Document } from "mongoose";

export enum RequestType {
  CODE_REVIEW = "code_review",
  BUG_FIX = "bug_fix",
  GITHUB_STAR = "github_star",
  COLLABORATION = "collaboration",
  MENTORSHIP = "mentorship",
  OTHER = "other",
}

export enum RequestStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IRequest extends Document {
  _id: string;
  requester: string; // User ID
  helper?: string; // User ID
  type: RequestType;
  title: string;
  description: string;
  repoUrl?: string;
  tags: string[];
  status: RequestStatus;
  helpCredits: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface IRequestCreate {
  requester: string;
  type: RequestType;
  title: string;
  description: string;
  repoUrl?: string;
  tags: string[];
  helpCredits: number;
}

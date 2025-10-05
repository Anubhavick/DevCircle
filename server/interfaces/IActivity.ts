import { Document } from "mongoose";

export enum ActivityType {
  REQUEST_CREATED = "request_created",
  REQUEST_ACCEPTED = "request_accepted",
  REQUEST_COMPLETED = "request_completed",
  HELP_PROVIDED = "help_provided",
  KARMA_EARNED = "karma_earned",
}

export interface IActivity extends Document {
  _id: string;
  user: string; // User ID
  type: ActivityType;
  description: string;
  relatedRequest?: string; // Request ID
  pointsEarned: number;
  createdAt: Date;
}

export interface IActivityCreate {
  user: string;
  type: ActivityType;
  description: string;
  relatedRequest?: string;
  pointsEarned: number;
}

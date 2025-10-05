import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  githubId: string;
  username: string;
  email: string;
  avatar?: string;
  college: string;
  helpScore: number;
  karmaPoints: number;
  githubProfile?: string;
  bio?: string;
  skills: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  githubId: string;
  username: string;
  email: string;
  avatar?: string;
  college: string;
  githubProfile?: string;
}

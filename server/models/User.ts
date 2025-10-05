import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema: Schema = new Schema(
  {
    githubId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    college: {
      type: String,
      required: true,
      index: true,
    },
    helpScore: {
      type: Number,
      default: 0,
    },
    karmaPoints: {
      type: Number,
      default: 0,
    },
    githubProfile: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    skills: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
UserSchema.index({ college: 1, karmaPoints: -1 });
UserSchema.index({ college: 1, helpScore: -1 });
UserSchema.index({ username: 1 });

export default mongoose.model<IUser>("User", UserSchema);

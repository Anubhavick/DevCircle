import mongoose, { Schema } from "mongoose";
import { IActivity, ActivityType } from "../interfaces/IActivity";

const ActivitySchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(ActivityType),
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    relatedRequest: {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
    pointsEarned: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ActivitySchema.index({ user: 1, createdAt: -1 });
ActivitySchema.index({ createdAt: -1 });

export default mongoose.model<IActivity>("Activity", ActivitySchema);

import mongoose, { Schema } from "mongoose";
import { IRequest, RequestType, RequestStatus } from "../interfaces/IRequest";

const RequestSchema: Schema = new Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    helper: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(RequestType),
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    repoUrl: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(RequestStatus),
      default: RequestStatus.OPEN,
      index: true,
    },
    helpCredits: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
RequestSchema.index({ status: 1, createdAt: -1 });
RequestSchema.index({ requester: 1, status: 1 });
RequestSchema.index({ helper: 1, status: 1 });
RequestSchema.index({ tags: 1 });

export default mongoose.model<IRequest>("Request", RequestSchema);

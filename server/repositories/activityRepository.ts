import Activity from "../models/Activity";
import { IActivity, IActivityCreate } from "../interfaces/IActivity";

export class ActivityRepository {
  async create(activityData: IActivityCreate): Promise<IActivity> {
    const activity = new Activity(activityData);
    return await activity.save();
  }

  async findByUser(userId: string, limit: number = 20): Promise<IActivity[]> {
    return await Activity.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("relatedRequest", "title type");
  }

  async findRecent(limit: number = 50): Promise<IActivity[]> {
    return await Activity.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("user", "username avatar")
      .populate("relatedRequest", "title type");
  }

  async findByCollege(college: string, limit: number = 50): Promise<IActivity[]> {
    return await Activity.find()
      .populate({
        path: "user",
        match: { college },
        select: "username avatar college",
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("relatedRequest", "title type");
  }
}

export default new ActivityRepository();

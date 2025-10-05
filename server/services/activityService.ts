import activityRepository from "../repositories/activityRepository";
import { IActivity } from "../interfaces/IActivity";

export class ActivityService {
  async getUserActivities(userId: string): Promise<IActivity[]> {
    return await activityRepository.findByUser(userId, 20);
  }

  async getRecentActivities(college?: string): Promise<IActivity[]> {
    if (college) {
      return await activityRepository.findByCollege(college, 50);
    }
    return await activityRepository.findRecent(50);
  }
}

export default new ActivityService();

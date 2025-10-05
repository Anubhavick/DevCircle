import User from "../models/User";
import { IUser, IUserCreate } from "../interfaces/IUser";

export class UserRepository {
  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async findByGithubId(githubId: string): Promise<IUser | null> {
    return await User.findOne({ githubId });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }

  async create(userData: IUserCreate): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async getLeaderboard(college: string, limit: number = 10): Promise<IUser[]> {
    return await User.find({ college, isActive: true })
      .sort({ karmaPoints: -1 })
      .limit(limit);
  }

  async findByCollege(college: string): Promise<IUser[]> {
    return await User.find({ college, isActive: true });
  }

  async updateHelpScore(userId: string, points: number): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { $inc: { helpScore: points, karmaPoints: points } },
      { new: true }
    );
  }
}

export default new UserRepository();

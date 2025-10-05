import userRepository from "../repositories/userRepository";
import { IUser, IUserCreate } from "../interfaces/IUser";

export class UserService {
  async getUserById(id: string): Promise<IUser | null> {
    return await userRepository.findById(id);
  }

  async getUserByGithubId(githubId: string): Promise<IUser | null> {
    return await userRepository.findByGithubId(githubId);
  }

  async createUser(userData: IUserCreate): Promise<IUser> {
    // Check if user already exists
    const existingUser = await userRepository.findByGithubId(userData.githubId);
    if (existingUser) {
      throw new Error("User already exists");
    }

    return await userRepository.create(userData);
  }

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return await userRepository.update(id, userData);
  }

  async getLeaderboard(college: string): Promise<IUser[]> {
    return await userRepository.getLeaderboard(college, 10);
  }

  async getCollegeUsers(college: string): Promise<IUser[]> {
    return await userRepository.findByCollege(college);
  }

  async updateHelpScore(userId: string, points: number): Promise<IUser | null> {
    return await userRepository.updateHelpScore(userId, points);
  }

  async getUserProfile(userId: string): Promise<IUser | null> {
    return await userRepository.findById(userId);
  }
}

export default new UserService();

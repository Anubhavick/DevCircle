import requestRepository from "../repositories/requestRepository";
import activityRepository from "../repositories/activityRepository";
import userService from "./userService";
import { IRequest, IRequestCreate, RequestStatus } from "../interfaces/IRequest";
import { ActivityType } from "../interfaces/IActivity";

export class RequestService {
  async getRequestById(id: string): Promise<IRequest | null> {
    return await requestRepository.findById(id);
  }

  async createRequest(requestData: IRequestCreate): Promise<IRequest> {
    // Verify user has enough karma points to create request
    const user = await userService.getUserById(requestData.requester);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.karmaPoints < requestData.helpCredits) {
      throw new Error("Insufficient karma points");
    }

    const request = await requestRepository.create(requestData);

    // Deduct karma points
    await userService.updateHelpScore(requestData.requester, -requestData.helpCredits);

    // Create activity
    await activityRepository.create({
      user: requestData.requester,
      type: ActivityType.REQUEST_CREATED,
      description: `Created request: ${requestData.title}`,
      relatedRequest: request._id,
      pointsEarned: 0,
    });

    return request;
  }

  async getOpenRequests(college?: string): Promise<IRequest[]> {
    return await requestRepository.findOpenRequests(college);
  }

  async getUserRequests(userId: string): Promise<IRequest[]> {
    return await requestRepository.findByRequester(userId);
  }

  async getUserHelpedRequests(userId: string): Promise<IRequest[]> {
    return await requestRepository.findByHelper(userId);
  }

  async acceptRequest(requestId: string, helperId: string): Promise<IRequest | null> {
    const request = await requestRepository.findById(requestId);
    if (!request) {
      throw new Error("Request not found");
    }

    if (request.status !== RequestStatus.OPEN) {
      throw new Error("Request is not open");
    }

    if (request.requester.toString() === helperId) {
      throw new Error("Cannot accept your own request");
    }

    const updatedRequest = await requestRepository.acceptRequest(requestId, helperId);

    // Create activity
    await activityRepository.create({
      user: helperId,
      type: ActivityType.REQUEST_ACCEPTED,
      description: `Accepted request: ${request.title}`,
      relatedRequest: requestId,
      pointsEarned: 0,
    });

    return updatedRequest;
  }

  async completeRequest(requestId: string, userId: string): Promise<IRequest | null> {
    const request = await requestRepository.findById(requestId);
    if (!request) {
      throw new Error("Request not found");
    }

    if (request.status !== RequestStatus.IN_PROGRESS) {
      throw new Error("Request is not in progress");
    }

    // Only requester can mark as complete
    if (request.requester.toString() !== userId) {
      throw new Error("Only requester can complete the request");
    }

    const updatedRequest = await requestRepository.completeRequest(requestId);

    if (request.helper) {
      // Award karma points to helper
      await userService.updateHelpScore(request.helper.toString(), request.helpCredits);

      // Create activities
      await activityRepository.create({
        user: request.helper.toString(),
        type: ActivityType.HELP_PROVIDED,
        description: `Helped with: ${request.title}`,
        relatedRequest: requestId,
        pointsEarned: request.helpCredits,
      });
    }

    await activityRepository.create({
      user: userId,
      type: ActivityType.REQUEST_COMPLETED,
      description: `Completed request: ${request.title}`,
      relatedRequest: requestId,
      pointsEarned: 0,
    });

    return updatedRequest;
  }

  async cancelRequest(requestId: string, userId: string): Promise<IRequest | null> {
    const request = await requestRepository.findById(requestId);
    if (!request) {
      throw new Error("Request not found");
    }

    // Only requester can cancel
    if (request.requester.toString() !== userId) {
      throw new Error("Only requester can cancel the request");
    }

    if (request.status === RequestStatus.COMPLETED) {
      throw new Error("Cannot cancel completed request");
    }

    // Refund karma points if cancelled
    await userService.updateHelpScore(userId, request.helpCredits);

    return await requestRepository.cancelRequest(requestId);
  }
}

export default new RequestService();

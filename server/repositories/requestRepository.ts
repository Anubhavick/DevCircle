import Request from "../models/Request";
import { IRequest, IRequestCreate, RequestStatus } from "../interfaces/IRequest";

export class RequestRepository {
  async findById(id: string): Promise<IRequest | null> {
    return await Request.findById(id)
      .populate("requester", "username avatar college")
      .populate("helper", "username avatar college");
  }

  async create(requestData: IRequestCreate): Promise<IRequest> {
    const request = new Request(requestData);
    return await request.save();
  }

  async update(
    id: string,
    requestData: Partial<IRequest>
  ): Promise<IRequest | null> {
    return await Request.findByIdAndUpdate(id, requestData, { new: true });
  }

  async findOpenRequests(college?: string): Promise<IRequest[]> {
    const query: any = { status: RequestStatus.OPEN };
    
    if (college) {
      // We'll need to populate requester to filter by college
      return await Request.find(query)
        .populate({
          path: "requester",
          match: { college },
          select: "username avatar college",
        })
        .sort({ createdAt: -1 });
    }

    return await Request.find(query)
      .populate("requester", "username avatar college")
      .sort({ createdAt: -1 });
  }

  async findByRequester(requesterId: string): Promise<IRequest[]> {
    return await Request.find({ requester: requesterId })
      .populate("helper", "username avatar")
      .sort({ createdAt: -1 });
  }

  async findByHelper(helperId: string): Promise<IRequest[]> {
    return await Request.find({ helper: helperId })
      .populate("requester", "username avatar")
      .sort({ createdAt: -1 });
  }

  async acceptRequest(requestId: string, helperId: string): Promise<IRequest | null> {
    return await Request.findByIdAndUpdate(
      requestId,
      {
        helper: helperId,
        status: RequestStatus.IN_PROGRESS,
      },
      { new: true }
    );
  }

  async completeRequest(requestId: string): Promise<IRequest | null> {
    return await Request.findByIdAndUpdate(
      requestId,
      {
        status: RequestStatus.COMPLETED,
        completedAt: new Date(),
      },
      { new: true }
    );
  }

  async cancelRequest(requestId: string): Promise<IRequest | null> {
    return await Request.findByIdAndUpdate(
      requestId,
      {
        status: RequestStatus.CANCELLED,
      },
      { new: true }
    );
  }
}

export default new RequestRepository();

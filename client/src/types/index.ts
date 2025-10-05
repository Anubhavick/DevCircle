export interface User {
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
  createdAt: string;
  updatedAt: string;
}

export enum RequestType {
  CODE_REVIEW = 'code_review',
  BUG_FIX = 'bug_fix',
  GITHUB_STAR = 'github_star',
  COLLABORATION = 'collaboration',
  MENTORSHIP = 'mentorship',
  OTHER = 'other',
}

export enum RequestStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Request {
  _id: string;
  requester: User | string;
  helper?: User | string;
  type: RequestType;
  title: string;
  description: string;
  repoUrl?: string;
  tags: string[];
  status: RequestStatus;
  helpCredits: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export enum ActivityType {
  REQUEST_CREATED = 'request_created',
  REQUEST_ACCEPTED = 'request_accepted',
  REQUEST_COMPLETED = 'request_completed',
  HELP_PROVIDED = 'help_provided',
  KARMA_EARNED = 'karma_earned',
}

export interface Activity {
  _id: string;
  user: User | string;
  type: ActivityType;
  description: string;
  relatedRequest?: Request | string;
  pointsEarned: number;
  createdAt: string;
}

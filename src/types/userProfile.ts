import type { BaseApiResponse } from "./baseApiResponse";

export interface UserProfile {
  _id: string;
  userId:
    | string
    | { _id: string; fullName: string; profileUrl?: string; email: string };
  username: string;
  content: string;
  suggestedQuestions: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfilePayload {
  content: string;
  suggestedQuestions?: string[];
  isPublished: boolean;
}

export interface UpdateProfilePayload {
  content?: string;
  suggestedQuestions?: string[];
  isPublished?: boolean;
}

export type UserProfileResponse = BaseApiResponse<UserProfile>;

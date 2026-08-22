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
  aiTone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfilePayload {
  content: string;
  suggestedQuestions?: string[];
  isPublished: boolean;
  aiTone?: string;
}

export interface UpdateProfilePayload {
  content?: string;
  suggestedQuestions?: string[];
  isPublished?: boolean;
  aiTone?: string;
}

export type UserProfileResponse = BaseApiResponse<UserProfile>;

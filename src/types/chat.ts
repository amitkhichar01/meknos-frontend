import type { BaseApiResponse } from "./baseApiResponse";

export interface ChatMessage {
  _id?: string;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt?: string;
}

export interface PublicUserProfile {
  _id: string;
  username: string;
  suggestedQuestions: string[];
  userId: {
    _id: string;
    fullName: string;
    profileUrl?: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type PublicProfileResponse = BaseApiResponse<PublicUserProfile>;

export type ChatHistoryResponse = BaseApiResponse<{
  session: { _id: string; messageCount: number; status: string } | null;
  messages: ChatMessage[];
}>;

export type SendMessageResponse = BaseApiResponse<{
  message: ChatMessage;
  session: { _id: string; messageCount: number; status: string };
}>;

import api from "./axios";
import type {
  PublicProfileResponse,
  ChatHistoryResponse,
  SendMessageResponse,
} from "../types/chat";

const chatApi = {
  getPublicProfile: (username: string) =>
    api.get<PublicProfileResponse>(
      `/user-profiles/public/${encodeURIComponent(username)}`,
    ),
  getChatHistory: (username: string) =>
    api.get<ChatHistoryResponse>(
      `/public/profiles/${encodeURIComponent(username)}/chat`,
    ),
  sendMessage: (username: string, messageText: string) =>
    api.post<SendMessageResponse>(
      `/public/profiles/${encodeURIComponent(username)}/chat`,
      {
        message: messageText,
      },
    ),
};

export default chatApi;

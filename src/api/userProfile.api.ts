import api from "./axios";
import type {
  UserProfileResponse,
  CreateProfilePayload,
  UpdateProfilePayload,
} from "../types/userProfile";
import type { PublicProfileResponse } from "../types/chat";

const userProfileApi = {
  getOwnerProfile: () => api.get<UserProfileResponse>("/user-profiles/me"),
  createProfile: (payload: CreateProfilePayload) =>
    api.post<UserProfileResponse>("/user-profiles", payload),
  updateProfile: (payload: UpdateProfilePayload) =>
    api.patch<UserProfileResponse>("/user-profiles/me", payload),
  getPublicProfile: (username: string) =>
    api.get<PublicProfileResponse>(
      `/user-profiles/public/${encodeURIComponent(username)}`,
    ),
};

export default userProfileApi;

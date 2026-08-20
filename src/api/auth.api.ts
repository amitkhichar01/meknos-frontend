import api from "./axios";
import type {
  GoogleLoginResponse,
  UserMeResponse,
  LogoutResponse,
} from "../types/auth";

const authApi = {
  googleLogin: (idToken: string) =>
    api.post<GoogleLoginResponse>("/auth/login/google", { idToken }),
  logout: () => api.post<LogoutResponse>("/auth/logout"),
  getMe: () => api.get<UserMeResponse>("/auth/me"),
};
export default authApi;

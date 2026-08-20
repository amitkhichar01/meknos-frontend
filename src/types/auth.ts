import type { BaseApiResponse } from "./baseApiResponse";

export interface User {
  _id: string;
  fullName: string;
  profileUrl?: string;
  email: string;
  status: string;
  role: string;
  authProvider: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GoogleLoginResponse {
  success: boolean;
  message: string;
  token: string;
  data: User;
}
export type UserMeResponse = BaseApiResponse<User>;
export type LogoutResponse = BaseApiResponse<Record<string, never>>;

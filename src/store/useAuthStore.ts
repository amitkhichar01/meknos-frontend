import { create } from "zustand";
import type { User } from "../types/auth";
import authApi from "../api/auth.api";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  fetchCurrentUser: () => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,

  fetchCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const { data: response } = await authApi.getMe();
      if (response && response.success && response.data) {
        set({
          user: response.data,
          isAuthenticated: true,
          error: null,
          isLoading: false,
          isInitialized: true,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
        });
      }
    } catch (_err: unknown) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        error: null,
      });
    }
  },

  loginWithGoogle: async (idToken: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data: response } = await authApi.googleLogin(idToken);
      const user = response.data;
      if (user) {
        set({
          user,
          isAuthenticated: true,
          error: null,
          isLoading: false,
          isInitialized: true,
        });
        return true;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        (err instanceof Error ? err.message : "Failed to sign in with Google");
      set({
        error: message,
        isLoading: false,
      });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;

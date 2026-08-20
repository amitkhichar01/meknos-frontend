import { create } from "zustand";
import type {
  UserProfile,
  CreateProfilePayload,
  UpdateProfilePayload,
} from "../types/userProfile";
import userProfileApi from "../api/userProfile.api";

interface UserProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  hasProfile: boolean;

  fetchOwnerProfile: () => Promise<void>;
  createProfile: (payload: CreateProfilePayload) => Promise<boolean>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<boolean>;
  clearError: () => void;
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  profile: null,
  isLoading: false,
  isSaving: false,
  error: null,
  hasProfile: false,

  fetchOwnerProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: response } = await userProfileApi.getOwnerProfile();
      if (response && response.data) {
        set({
          profile: response.data,
          hasProfile: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          profile: null,
          hasProfile: false,
          isLoading: false,
        });
      }
    } catch (_err: unknown) {
      set({
        profile: null,
        hasProfile: false,
        isLoading: false,
        error: null,
      });
    }
  },

  createProfile: async (payload: CreateProfilePayload) => {
    set({ isSaving: true, error: null });
    try {
      const { data: response } = await userProfileApi.createProfile(payload);
      const newProfile = response.data;
      if (newProfile) {
        set({
          profile: newProfile,
          hasProfile: true,
          isSaving: false,
          error: null,
        });
        return true;
      }
      throw new Error("Failed to parse created profile");
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        (err instanceof Error ? err.message : "Failed to create profile");
      set({
        error: message,
        isSaving: false,
      });
      return false;
    }
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    set({ isSaving: true, error: null });
    try {
      const { data: response } = await userProfileApi.updateProfile(payload);
      const updatedProfile = response.data;
      if (updatedProfile) {
        set({
          profile: updatedProfile,
          hasProfile: true,
          isSaving: false,
          error: null,
        });
        return true;
      }
      throw new Error("Failed to parse updated profile");
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        (err instanceof Error ? err.message : "Failed to update profile");
      set({
        error: message,
        isSaving: false,
      });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useUserProfileStore;

import { create } from "zustand";
import { authApi } from "../api/rest/authApi";
import type { Gender } from "../types/general/GenderType";
import { persist } from "zustand/middleware";
import i18n from "../i18n";

interface User {
  fullName : string;
  gender : Gender;
  language : string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const genderMap: Record<number, Gender> = {
  0: "None",
  1: "Male",
  2: "Female",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
    user: null,
    setUser: (user) => set({ user }),
    fetchUser: async () => {
      const response = await authApi.fetchUser();
      if (response.status === 200) {
        const userData: User = {
          fullName: response.data.fullName,
          gender: genderMap[response.data.gender] || "None",
          language: response.data.language
        };
        set({ user: userData as User });
        i18n.changeLanguage(userData.language);
      } else {
        set({ user: null });
      }
    },
    logout: async () => {
      await authApi.logout();
      set({ user: null });
    }
  }),
  { name: "auth-storage" })
);
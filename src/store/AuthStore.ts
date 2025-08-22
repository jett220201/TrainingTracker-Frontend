import { create } from "zustand";
import { authApi } from "../api/authApi";

type Gender = "None" | "Male" | "Female"

interface User {
  fullname : string;
  gender : Gender;
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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    await authApi.fetchUser().then(response => {
      if (response.status === 200) {
        const userData : User = {
          fullname: response.data.fullname,
          gender: genderMap[response.data.gender] || "None"
        };
        set({ user: userData as User });
      } else {
        set({ user: null });
      }
    })
  },
  logout: async () => {
    await authApi.logout();
    set({ user: null });
  }
}));
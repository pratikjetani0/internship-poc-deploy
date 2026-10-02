import { create } from "zustand";
import { storage } from "@/lib/auth/storage";
import type { User } from "@/features/user/types/user.types";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (user: User) => void;
  initialize: () => void;
  logout: () => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  setUser: (user) => {
    storage.setUser(user);

    set({
      user,
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  initialize: () => {
    const user = storage.getUser();
    const token = storage.getAccessToken();

    set({
      user,
      isAuthenticated: !!user && !!token,
      isInitialized: true,
    });
  },

  logout: () => {
    storage.clear();

    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  clearUser: () => {
    storage.clear();

    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },
}));

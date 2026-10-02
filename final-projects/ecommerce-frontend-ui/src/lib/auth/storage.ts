import type { User } from "@/features/user/types/user.types";

const ACCESS_TOKEN_KEY = "accessToken";

const USER_KEY = "user";

export const storage = {
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  getAuth() {
    return {
      user: this.getUser(),
      accessToken: this.getAccessToken(),
    };
  },

  getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);

    return user ? (JSON.parse(user) as User) : null;
  },

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem(USER_KEY);
  },

  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

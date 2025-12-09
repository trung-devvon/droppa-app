import { storage, STORAGE_KEYS } from '@/src/lib/storage';
import type { User } from '@/src/types/models';
import { create } from 'zustand';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => Promise<void>;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  // Set user
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  // Set token
  setToken: async (token) => {
    if (token) {
      await storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
    } else {
      await storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    }
    set({ token, isAuthenticated: !!token });
  },

  // Login
  login: async (user, token) => {
    await storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
    await storage.set(STORAGE_KEYS.USER_DATA, user);
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  // Logout
  logout: async () => {
    await storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    await storage.remove(STORAGE_KEYS.USER_DATA);
    await storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  // Initialize auth state from storage
  initialize: async () => {
    try {
      const [token, user] = await Promise.all([
        storage.get<string>(STORAGE_KEYS.AUTH_TOKEN),
        storage.get<User>(STORAGE_KEYS.USER_DATA),
      ]);

      set({
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isLoading: false });
    }
  },
}));

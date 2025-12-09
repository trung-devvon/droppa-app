import { storage, STORAGE_KEYS } from '@/src/lib/storage';
import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';
type Language = 'vi' | 'en';

interface AppState {
  // State
  theme: Theme;
  language: Language;
  notificationsEnabled: boolean;

  // Actions
  setTheme: (theme: Theme) => Promise<void>;
  setLanguage: (language: Language) => Promise<void>;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  theme: 'light',
  language: 'vi',
  notificationsEnabled: true,

  // Set theme
  setTheme: async (theme) => {
    await storage.set(STORAGE_KEYS.THEME, theme);
    set({ theme });
  },

  // Set language
  setLanguage: async (language) => {
    await storage.set(STORAGE_KEYS.LANGUAGE, language);
    set({ language });
  },

  // Set notifications enabled
  setNotificationsEnabled: async (enabled) => {
    await storage.set('notificationsEnabled', enabled);
    set({ notificationsEnabled: enabled });
  },

  // Initialize app state from storage
  initialize: async () => {
    try {
      const [theme, language, notificationsEnabled] = await Promise.all([
        storage.get<Theme>(STORAGE_KEYS.THEME),
        storage.get<Language>(STORAGE_KEYS.LANGUAGE),
        storage.get<boolean>('notificationsEnabled'),
      ]);

      set({
        theme: theme || 'light',
        language: language || 'vi',
        notificationsEnabled: notificationsEnabled ?? true,
      });
    } catch (error) {
      console.error('Error initializing app state:', error);
    }
  },
}));

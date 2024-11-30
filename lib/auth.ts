import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  username: string;
  isAdmin: boolean;
  tags: string[];
}

interface AuthState {
  authenticated: boolean;
  user: User | null;
  login: (authData: { authenticated: boolean; user: User }) => void;
  logout: () => void;
}

const isBrowser = typeof window !== 'undefined';

// Safe storage that works in both client and server environments
const safeStorage = {
  getItem: (name: string): string | null => {
    if (!isBrowser) return null;
    try {
      return localStorage.getItem(name);
    } catch (error) {
      console.error('Error getting storage item:', error);
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(name, value);
      // Also set in cookies for SSR
      Cookies.set('auth-storage', value, { path: '/' });
    } catch (error) {
      console.error('Error setting storage item:', error);
    }
  },
  removeItem: (name: string) => {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(name);
      // Also remove from cookies
      Cookies.remove('auth-storage', { path: '/' });
    } catch (error) {
      console.error('Error removing storage item:', error);
    }
  }
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      authenticated: false,
      user: null,
      login: (authData) => set({ authenticated: authData.authenticated, user: authData.user }),
      logout: () => set({ authenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => safeStorage),
      skipHydration: true, // Important for SSR
    }
  )
);

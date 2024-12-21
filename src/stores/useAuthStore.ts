import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, Destination } from '../types/auth';

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userInfo: null,
      error: null,
      selectedDestination: null,
      
      setUserInfo: (userInfo) => set({ userInfo }),
      
      setError: (error) => set({ error }),
      
      setSelectedDestination: (destination) => set({ 
        selectedDestination: destination 
      }),
      
      signIn: async (googleSignInResult) => {
        try {
          set({ userInfo: googleSignInResult.userInfo, error: googleSignInResult.error });
          return true;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'An error occurred' });
          return false;
        }
      },
      
      signOut: async () => {
        try {
          set({ 
            userInfo: null, 
            selectedDestination: null, 
            error: null 
          });
          return true;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'An error occurred' });
          return false;
        }
      },
      
      isAuthenticated: () => {
        return get().userInfo !== null;
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
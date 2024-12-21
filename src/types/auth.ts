import { GoogleSignin, statusCodes, User, SignInResponse } from '@react-native-google-signin/google-signin';
  
  export interface Destination {
    id: number;
    name: string;
    icon: string;
  }
  
  export interface AuthState {
    userInfo: User | null;
    error: string | null;
    selectedDestination: Destination | null;
    
    // Actions
    setUserInfo: (userInfo: User | null) => void;
    setError: (error: string | null) => void;
    setSelectedDestination: (destination: Destination | null) => void;
    signIn: (googleSignInResult: { userInfo: User|null, error: string|null}) => Promise<boolean>;
    signOut: () => Promise<boolean>;
    isAuthenticated: () => boolean;
    clearError: () => void;
  }
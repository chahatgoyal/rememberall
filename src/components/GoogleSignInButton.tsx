import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import GoogleLogo from './assets/GoogleLogo.svg'
import { GoogleSignin, statusCodes, User, SignInResponse } from '@react-native-google-signin/google-signin';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useAuthStore from '../stores/useAuthStore';
import { RootStackParamList } from '../types/navigation';

// Interface for your button props
interface GoogleSignInButtonProps {
  onPress: () => void;
  style?: object;
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
}

interface SignInResult {
  userInfo: User | null;
  error: string | null;
}

GoogleSignin.configure({
  webClientId: 'configure-web-client-id', // Client ID for Web application
});

const signInWithGoogle = async (): Promise<SignInResult> => {
  try {
    // Check if Google Play Services are available (for Android)
    await GoogleSignin.hasPlayServices();
    const signInResponse: SignInResponse = await GoogleSignin.signIn();

    // Extract user information from the response
    const userInfo = signInResponse.data;

    // Return user information
    return {
      userInfo,
      error: null,
    };
  } catch (error:any) {

    console.log(error);



    let errorMessage = 'An unknown error occurred';

    // Handle specific error codes
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      errorMessage = 'User cancelled the login flow';
    } else if (error.code === statusCodes.IN_PROGRESS) {
      errorMessage = 'Sign in is already in progress';
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      errorMessage = 'Google Play Services is not available or outdated';
    } else {
      errorMessage = error.message;
    }

    // Return error information
    return {
      userInfo: null,
      error: errorMessage,
    };
  }
};

type SignInScreenProps = {
  
};

// Main button component
const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onPress, style, navigation }) => {

  const signIn = useAuthStore(state => state.signIn);
  const setError = useAuthStore(state => state.setError);

  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (await signIn(result)) {
        navigation.replace('DestinationSelector');
      }
    } catch (error) {
      console.log(error);
      setError(error instanceof Error ? error.message : 'Sign in failed');
    }
  };


  return (
    <Button
      mode="outlined"
      icon={({ size }) => <GoogleLogo/>}
      onPress={handleSignIn}
      style={[styles.button, style]}
      labelStyle={styles.buttonLabel}
    >
      Sign in with Google
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: '#4285F4',
    borderRadius: 8,
    padding: 8,
  },
  buttonLabel: {
    color: '#4285F4',
  },
});

export default GoogleSignInButton;

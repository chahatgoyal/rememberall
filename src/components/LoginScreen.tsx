import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoginScreenProps {
  onLoginSuccess?: (user: any) => void;
  onGoogleSignInSuccess?: (user: any) => void;
  onSignUpPress?: () => void;
  onForgotPasswordPress?: () => void;
}

const LoginScreen = (props:LoginScreenProps) => {
  // Move all hooks to the top level of the component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Add your login logic here
      console.log('Login attempted with:', { email, password });
      props.onLoginSuccess?.({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await GoogleSignin.hasPlayServices();``
      const userInfo = await GoogleSignin.signIn();
      props.onGoogleSignInSuccess?.(userInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
//try reading more about safe area view
  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`flex-1 p-6 justify-center`}>
        {/* Orange decorative element */}
        <View style={tw`absolute top-0 right-0 w-32 h-32 bg-orange-300 rounded-bl-full`} />
        
        <View style={tw`mb-12`}>
          <Text style={tw`text-3xl font-bold mb-2`}>Login</Text>
          <Text style={tw`text-gray-500`}>Please sign in to continue.</Text>
        </View>

        {/* Input fields */}
        <View style={tw`space-y-4`}>
          <View>
            <Text style={tw`text-gray-500 text-sm mb-1`}>EMAIL</Text>
            <TextInput
              style={tw`bg-white p-4 rounded-lg border border-gray-200`}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>

          <View>
            <Text style={tw`text-gray-500 text-sm mb-1`}>PASSWORD</Text>
            <TextInput
              style={tw`bg-white p-4 rounded-lg border border-gray-200`}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity 
            onPress={props.onForgotPasswordPress}
            disabled={isLoading}
          > 
          <Text style={tw`text-orange-400 text-right`}>FORGOT</Text>
          </TouchableOpacity>
        </View>

        {/* Error message */}
        {error && (
          <Text style={tw`text-red-500 mt-4 text-center`}>{error}</Text>
        )}

        {/* Login buttons */}
        <View style={tw`mt-8 space-y-4`}>
          <TouchableOpacity 
            style={tw`bg-orange-400 p-4 rounded-full ${isLoading ? 'opacity-50' : ''}`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={tw`text-white text-center font-semibold`}>
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`bg-blue-500 p-4 rounded-full ${isLoading ? 'opacity-50' : ''}`}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            <Text style={tw`text-white text-center font-semibold`}>
              {isLoading ? 'SIGNING IN...' : 'SIGN IN WITH GOOGLE'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign up link */}
        <View style={tw`flex-row justify-center mt-8`}>
          <Text style={tw`text-gray-500`}>Don't have an account? </Text>
          <TouchableOpacity 
            onPress={props.onSignUpPress}
            disabled={isLoading}
          >
            <Text style={tw`text-orange-400`}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
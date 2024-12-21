import React, { ReactNode } from 'react';
import LoginComponent from './src/components/LoginComponent'; // Adjust this path based on your project structure
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';
import DestinationSelector from './src/components/DestinationSelector'


interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Error:', error);
    console.log('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong!</Text>
        </View>
      );
    }
    return this.props.children;
  }
}


const App = () => {


  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    // <PaperProvider><LoginComponent/></PaperProvider>
<PaperProvider>
    <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="SignIn" component={LoginComponent} /> */}
          <Stack.Screen 
            name="DestinationSelector" 
            component={DestinationSelector}
            // options={{ gestureEnabled: false }}
          />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          {/* <Stack.Screen name="AddDestination" component={AddDestination} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>    
      // <LoginScreen
      //   onLoginSuccess={handleLoginSuccess}
      //   onGoogleSignInSuccess={handleGoogleSignInSuccess}
      //   onSignUpPress={() => console.log('Sign up pressed')}
      //   onForgotPasswordPress={() => console.log('Forgot password pressed')}
      // />
  );
};

export default App;
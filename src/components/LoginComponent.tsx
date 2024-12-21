import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  Surface,
  useTheme,
  Divider,
} from 'react-native-paper';
import GoogleSignInButton from './GoogleSignInButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';


type SignInScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
};

const LoginComponent: React.FC<SignInScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.card} elevation={1}>
        {/* Header */}
        <Text 
          variant="headlineMedium" 
          style={styles.headerText}
        >
          We make sure you never forget again!
        </Text>

        {/* Form */}
        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="Phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.input}
            outlineStyle={styles.inputOutline}
          />
          
          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.loginButton}
            contentStyle={styles.buttonContent}
            buttonColor="#1B4B40"
          >
            Get OTP
          </Button>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
            <Text variant="bodyMedium" style={styles.dividerText}>
              or Login with
            </Text>
            <Divider style={styles.divider} />
          </View>
          {/* Google Sign In */}
          <GoogleSignInButton onPress={() => {}} navigation={navigation}/>
        </View>
      </Surface>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 12,
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  formContainer: {
    gap: 16,
  },
  input: {
    backgroundColor: 'white',
  },
  inputOutline: {
    borderRadius: 8,
  },
  loginButton: {
    borderRadius: 8,
  },
  buttonContent: {
    height: 48,
    justifyContent: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    color: '#666',
  },
  googleButton: {
    borderRadius: 8,
    borderWidth: 2,
  },
});

export default LoginComponent;
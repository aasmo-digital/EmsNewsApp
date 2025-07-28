import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthStackParamList} from './types';
import LanguageScreen from '../screens/auth/LanguageScreen/LanguageScreen';
import SignInScreen from '../screens/auth/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen/ForgotPasswordScreen';
import VerificationScreen from '../screens/auth/VerificationScreen/VerificationScreen';
import CreateNewPasswordScreen from '../screens/auth/CreateNewPasswordScreen/CreateNewPasswordScreen';
import InterestsScreen from '../screens/auth/InterestsScreen/InterestsScreen';
import PickYourStateScreen from '../screens/auth/PickYourStateScreen/PickYourStateScreen';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="InterestsScreen" component={InterestsScreen} />
      <Stack.Screen name="PickYourState" component={PickYourStateScreen} />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

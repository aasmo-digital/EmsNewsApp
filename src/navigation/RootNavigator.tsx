import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {RootStackParamList} from './types';

import SplashScreen from '../screens/auth/SplashScreen/SplashScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

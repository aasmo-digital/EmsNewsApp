import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList, AppTabParamList} from './types';
import NewsDetailScreen from '../screens/home/NewsDetail/NewsDetailScreen';
import BottomTabs from './BottomTabs';
import CommentsScreen from '../screens/home/CommentsScreen/CommentsScreen';

const Stack = createStackNavigator<AppStackParamList>();

// Main App Stack Navigator (includes tabs)
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="AppTabs"
        component={BottomTabs}
       />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
       />
       <Stack.Screen
        name="Comments"
        component={CommentsScreen}
       />
    </Stack.Navigator>
  );
};

export default AppNavigator;

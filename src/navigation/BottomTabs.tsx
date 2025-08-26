import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/bottomtabs/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/bottomtabs/ProfileScreen/ProfileScreen';
import Explore from '../screens/bottomtabs/explore/Explore';
import Coverage from '../screens/bottomtabs/coverage/Coverage';
import Saved from '../screens/bottomtabs/saved/Saved';

import {AppTabParamList} from './types';
import {CustomTabBar} from '../components/componentsIndex';

const Tab = createBottomTabNavigator<AppTabParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Coverage" component={Coverage} />
      <Tab.Screen name="Saved" component={Saved} />
      <Tab.Screen name="More" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

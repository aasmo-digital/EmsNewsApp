import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList, AppTabParamList} from './types';
import BottomTabs from './BottomTabs';
import NewsDetailScreen from '../screens/home/NewsDetail/NewsDetailScreen';
import CommentsScreen from '../screens/home/CommentsScreen/CommentsScreen';
import EPaperScreen from '../screens/home/EPaper/EPaperScreen';
import Notification from '../screens/home/Notification/Notification';
import EditProfile from '../screens/home/EditProfile/EditProfile';
import Privacy from '../screens/home/Privacy/Privacy';
import ChanegPassword from '../screens/home/ChangePassword/ChangePassword';
import InterestsScreen from '../screens/auth/InterestsScreen/InterestsScreen';
import PickYourStateScreen from '../screens/auth/PickYourStateScreen/PickYourStateScreen';
import EmsTv from '../screens/home/EmsTv/EmsTv';
import TermsConditon from '../screens/home/TermsCondition/TermsConditon';
import NewsByState from '../screens/home/newsbystate/NewsByState';
import NewsByDist from '../screens/home/newsbydist/NewsByDist';
import Explore from '../screens/bottomtabs/explore/Explore';
import RelatedNews from '../screens/home/relatedNews/RelatedNews';
import NewsByCategoryScreen from '../screens/home/newsByCategory/NewsByCategoryScreen';

const Stack = createStackNavigator<AppStackParamList>();

// Main App Stack Navigator (includes tabs)
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppTabs" component={BottomTabs} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <Stack.Screen name="NewsByState" component={NewsByState} />
      <Stack.Screen name="NewsByDist" component={NewsByDist} />

      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="EPaper" component={EPaperScreen} />
      <Stack.Screen name="EmsTv" component={EmsTv} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="RelatedNews" component={RelatedNews} />

      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="TermsConditon" component={TermsConditon} />

      <Stack.Screen name="ChanegPassword" component={ChanegPassword} />

      <Stack.Screen name="InterestsScreen" component={InterestsScreen} />
      <Stack.Screen name="PickYourState" component={PickYourStateScreen} />

      <Stack.Screen
        name="NewsByCategoryScreen"
        component={NewsByCategoryScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

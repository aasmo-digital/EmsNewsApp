import {NavigatorScreenParams} from '@react-navigation/native';

// Auth स्टैक में मौजूद स्क्रीन
export type AuthStackParamList = {
  // Splash: undefined;
  Language: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Verification: undefined;
  CreateNewPassword: undefined;
  InterestsScreen: undefined;
  PickYourState: undefined;
};

// Main App के टैब में मौजूद स्क्रीन
export type AppTabParamList = {
  Home: undefined;
  Explore: undefined;
  Saved: undefined;
  Coverage: undefined;
  Profile: undefined;
};

// Main App स्टैक, जिसमें टैब और अन्य स्क्रीन शामिल हैं
export type AppStackParamList = {
  AppTabs: NavigatorScreenParams<AppTabParamList>; // टैब नेविगेटर को नेस्ट करना
  NewsDetail: {articleId: string};
  Comments: {postId: string};
  EPaper: undefined;
  Notification: undefined;
  EditProfile: undefined;
  Privacy: undefined;
  TermsConditon: undefined;
  ChanegPassword: undefined;
  InterestsScreen: undefined;
  PickYourState: undefined;
  EmsTv: undefined;
  NewsByState: undefined;
  NewsByDist: undefined;
};

// रूट नेविगेटर के लिए
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
  Splash: undefined;
};

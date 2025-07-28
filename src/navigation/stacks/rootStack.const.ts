import {lazy} from 'react';
import LazyScreen from '../LazyWrapper';
  

export const stackScreens = [
  {
    name: 'SplashScreen',
    component: LazyScreen(
      lazy(() => import('../../screens/auth/SplashScreen/SplashScreen')),
    ),
  },
   
];

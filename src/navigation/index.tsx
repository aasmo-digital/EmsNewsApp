import {NavigationContainer} from '@react-navigation/native';
import {FC} from 'react';
import RootStack from './stacks/RootStack';
import {navigationRef} from '../utility/navigationServices';
import RootNavigator from './RootNavigator';
import {FontSizeProvider} from '../context/FontSizeContext';
import {LanguageProvider} from '../context/LanguageContext';
import {ThemeProvider} from '../context/ThemeContext';

const Route: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <LanguageProvider>
        <ThemeProvider>
          <FontSizeProvider>
            <RootNavigator />
          </FontSizeProvider>
        </ThemeProvider>
      </LanguageProvider>
    </NavigationContainer>
  );
};

export default Route;

// import React, {createContext, useContext, useState} from 'react';
// import color from '../theme/color';

// type ThemeMode = 'light' | 'dark';

// const ThemeContext = createContext<any>(null);

// export const ThemeProvider = ({children}: any) => {
//   const [mode, setMode] = useState<ThemeMode>('light');

//   const toggleTheme = () => {
//     setMode(prev => (prev === 'light' ? 'dark' : 'light'));
//   };

//   const colors = {
//     background: mode === 'light' ? '#fff' : '#121212',
//     text: mode === 'light' ? '#000' : '#fff',
//     card: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
//     primary: mode === 'light' ? color.appColor : color.warning,
//     btntext: mode === 'light' ? color.white : color.white,
//     btnbg: mode === 'light' ? color.appColor : color.warning,
//   };

//   return (
//     <ThemeContext.Provider value={{mode, toggleTheme, colors}}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) throw new Error('useTheme must be used within provider');
//   return context;
// };



import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from '../theme/color';

type ThemeMode = 'light' | 'dark';

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({children}: any) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  // ✅ Load saved theme from storage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem('themeMode');
        if (savedMode) {
          setMode(savedMode as ThemeMode);
        }
      } catch (e) {
        console.log('Failed to load theme:', e);
      }
    };
    loadTheme();
  }, []);

  // ✅ Toggle and save theme
  const toggleTheme = async () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    try {
      await AsyncStorage.setItem('themeMode', newMode);
    } catch (e) {
      console.log('Failed to save theme:', e);
    }
  };

  const colors = {
    background: mode === 'light' ? '#fff' : '#121212',
    text: mode === 'light' ? '#000' : '#fff',
    card: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
    primary: mode === 'light' ? color.appColor : color.warning,
    btntext: color.white,
    btnbg: mode === 'light' ? color.appColor : color.warning,
  };

  return (
    <ThemeContext.Provider value={{mode, toggleTheme, colors}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within provider');
  return context;
};

// // FontSizeContext.tsx
// import React, {createContext, useContext, useState} from 'react';

// const FontSizeContext = createContext<any>(null);

// export const FontSizeProvider = ({children}: any) => {
//   const [baseSize, setBaseSize] = useState<number>(14); // base text size

//   const sizes = {
//     body: baseSize,
//     subheading: baseSize * 1.25,
//     heading: baseSize * 1.5,
//   };

//   return (
//     <FontSizeContext.Provider value={{baseSize, setBaseSize, sizes}}>
//       {children}
//     </FontSizeContext.Provider>
//   );
// };

// export const useFontSize = () => useContext(FontSizeContext);


//main code -------------------------

// import React, {createContext, useContext, useState} from 'react';

// type FontName = 'Khand' | 'Poppins';

// interface FontVariants {
//   light: string;
//   regular: string;
//   medium: string;
//   semiBold: string;
//   bold: string;
// }

// interface FontContextType {
//   baseSize: number;
//   setBaseSize: (size: number) => void;
//   fontFamily: FontVariants;
//   fontName:any;
//   setFontName: (name: FontName) => void;
//   sizes: {
//     body: number;
//     subheading: number;
//     heading: number;
//   };
// }

// const fontMap: Record<FontName, FontVariants> = {
//   Khand: {
//     light: 'Khand-Light',
//     regular: 'Khand-Regular',
//     medium: 'Khand-Medium',
//     semiBold: 'Khand-SemiBold',
//     bold: 'Khand-Bold',
//   },
//   Poppins: {
//     light: 'Poppins-Light',
//     regular: 'Poppins-Regular',
//     medium: 'Poppins-Medium',
//     semiBold: 'Poppins-SemiBold',
//     bold: 'Poppins-Bold',
//   },
// };

// const FontSizeContext = createContext<FontContextType | null>(null);

// export const FontSizeProvider = ({children}: any) => {
//   const [baseSize, setBaseSize] = useState(14);
//   const [fontName, setFontName] = useState<FontName>('Khand');

//   const sizes = {
//     body: baseSize,
//     subheading: baseSize * 1.25,
//     heading: baseSize * 1.5,
//   };

//   const fontFamily = fontMap[fontName];

//   return (
//     <FontSizeContext.Provider
//       value={{baseSize, setBaseSize, fontFamily, setFontName, sizes,fontName}}>
//       {children}
//     </FontSizeContext.Provider>
//   );
// };

// export const useFontSize = () => {
//   const context = useContext(FontSizeContext);
//   if (!context) throw new Error('useFontSize must be used within provider');
//   return context;
// };


import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FontName = 'Khand' | 'Poppins';

interface FontVariants {
  light: string;
  regular: string;
  medium: string;
  semiBold: string;
  bold: string;
}

interface FontContextType {
  baseSize: number;
  setBaseSize: (size: number) => void;
  fontFamily: FontVariants;
  fontName: FontName;
  setFontName: (name: FontName) => void;
  sizes: {
    body: number;
    subheading: number;
    heading: number;
  };
}

const fontMap: Record<FontName, FontVariants> = {
  Khand: {
    light: 'Khand-Light',
    regular: 'Khand-Regular',
    medium: 'Khand-Medium',
    semiBold: 'Khand-SemiBold',
    bold: 'Khand-Bold',
  },
  Poppins: {
    light: 'Poppins-Light',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
};

const FontSizeContext = createContext<FontContextType | null>(null);

export const FontSizeProvider = ({children}: any) => {
  const [baseSize, setBaseSizeState] = useState(14);
  const [fontName, setFontNameState] = useState<FontName>('Khand');

  // ✅ Load from storage
  useEffect(() => {
    const loadFontSettings = async () => {
      try {
        const savedSize = await AsyncStorage.getItem('baseFontSize');
        const savedFont = await AsyncStorage.getItem('fontName');
        if (savedSize) setBaseSizeState(parseInt(savedSize, 10));
        if (savedFont) setFontNameState(savedFont as FontName);
      } catch (e) {
        console.log('Failed to load font settings:', e);
      }
    };
    loadFontSettings();
  }, []);

  // ✅ Save size
  const setBaseSize = async (size: number) => {
    setBaseSizeState(size);
    try {
      await AsyncStorage.setItem('baseFontSize', size.toString());
    } catch (e) {
      console.log('Failed to save font size:', e);
    }
  };

  // ✅ Save font family
  const setFontName = async (name: FontName) => {
    setFontNameState(name);
    try {
      await AsyncStorage.setItem('fontName', name);
    } catch (e) {
      console.log('Failed to save font name:', e);
    }
  };

  const sizes = {
    body: baseSize,
    subheading: baseSize * 1.25,
    heading: baseSize * 1.5,
  };

  const fontFamily = fontMap[fontName];

  return (
    <FontSizeContext.Provider
      value={{baseSize, setBaseSize, fontFamily, fontName, setFontName, sizes}}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) throw new Error('useFontSize must be used within provider');
  return context;
};

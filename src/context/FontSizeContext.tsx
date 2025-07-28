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

import React, {createContext, useContext, useState} from 'react';

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
  const [baseSize, setBaseSize] = useState(14);
  const [fontName, setFontName] = useState<FontName>('Khand');

  const sizes = {
    body: baseSize,
    subheading: baseSize * 1.25,
    heading: baseSize * 1.5,
  };

  const fontFamily = fontMap[fontName];

  return (
    <FontSizeContext.Provider
      value={{baseSize, setBaseSize, fontFamily, setFontName, sizes}}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) throw new Error('useFontSize must be used within provider');
  return context;
};

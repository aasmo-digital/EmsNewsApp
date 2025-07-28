// src/navigation/LazyWrapper.tsx
import React, {Suspense, ComponentType} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import color from '../theme/color';
import {CustomStatusbar} from '../components/componentsIndex';

const LazyScreen = (Component: ComponentType<any>) => () =>
  (
    <Suspense
      fallback={
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <CustomStatusbar />
          <ActivityIndicator size="large" color={color.appColor} />
        </SafeAreaView>
      }>
      <Component />
    </Suspense>
  );

export default LazyScreen;

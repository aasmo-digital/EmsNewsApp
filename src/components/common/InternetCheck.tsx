import React, {memo, useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import font from '../../theme/font';
import color from '../../theme/color';
import {useTranslation} from 'react-i18next';
import TextCustom from './TextCustom';

const InternetCheck = () => {
  const {t} = useTranslation();
  const [isConnected, setIsConnected] = useState<any>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <TextCustom style={styles.text} label={t('no_internet_connect')} />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color?.warning,
    paddingHorizontal: 10,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    // bottom: 0,
    // right: 0,
    // left: 0,
  },
  text: {
    color: 'white',
    fontFamily: font?.PoppinsRegular,
  },
});

export default memo(InternetCheck);

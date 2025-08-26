 

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';

const TermsConditon = () => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  return (
    <PageContainer style={{paddingTop:25,}}>
      <View style={{flex: 1}}>
        <HeaderCompt showBackButton={true} title={t('terms_and_conditions')} />
      </View>
    </PageContainer>
  );
};

export default TermsConditon;

const styles = StyleSheet.create({});


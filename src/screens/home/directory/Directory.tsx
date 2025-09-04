import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  HeaderCompt,
  PageContainer,
  SearchBarCompt,
} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';

const Directory = () => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  return (
    <PageContainer>
      <HeaderCompt title={t('directory_text')} />
      <SearchBarCompt />
      <Text
        style={{
          color: colors.primary,
          textAlign: 'center',
          fontSize: sizes.heading,
          fontFamily: fontFamily.medium,
          marginTop: 50,
        }}>
        Working on This
      </Text>
    </PageContainer>
  );
};

export default Directory;

const styles = StyleSheet.create({});

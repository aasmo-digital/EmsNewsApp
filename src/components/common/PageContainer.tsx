import React, { memo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
  StatusBarStyle,
} from 'react-native';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';

interface PageContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  style?: object;
  contentContainerStyle?: object;
  statusBarProps?: {
    backgroundColor?: string;
    barStyle?: StatusBarStyle;
    translucent?: boolean;
    hidden?: boolean;
  };
}

const PageContainer = ({
  children,
  scroll = false,
  style = {},
  contentContainerStyle = {},
  statusBarProps = {},
  
}: PageContainerProps) => {
  const Container = scroll ? ScrollView : View;

  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: colors.background}]}>
      <StatusBar
        backgroundColor={statusBarProps.backgroundColor ?? colors.background}
        barStyle={statusBarProps.barStyle ?? 'dark-content'}
        translucent={statusBarProps.translucent ?? false}
        hidden={statusBarProps.hidden ?? false}
      />
      <KeyboardAvoidingView
        style={[styles.container, style]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Container
          style={[styles.innerContainer]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            scroll
              ? [styles.contentContainer, contentContainerStyle]
              : undefined
          }>
          {children}
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default memo(PageContainer);
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // paddingTop: 25,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

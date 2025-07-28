import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import i18next from '../../../../i18n';
import {ButtonCompt, PageContainer} from '../../../components/componentsIndex';
import color from '../../../theme/color';
import imageIndex from '../../../assets/imageIndex';

// मान लें कि आपके पास AuthStackParamList है
type AuthStackParamList = {
  Language: undefined;
  SignIn: undefined;
};

type LanguageScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Language'
>;

const LanguageScreen = ({
  navigation,
}: {
  navigation: LanguageScreenNavigationProp;
}) => {
  const {t} = useTranslation();

  const changeLanguageAndNavigate = (lang: string) => {
    i18next.changeLanguage(lang);
    navigation.navigate('SignIn');
  };
  return (
    <PageContainer
      statusBarProps={{
        backgroundColor: 'transparent',
        barStyle: 'dark-content',
        translucent: true,
      }}>
      <ImageBackground
        source={imageIndex.bg}
        style={{flex: 1}}
        resizeMode="stretch">
        <View style={styles.container}>
          {/* <Image source={require('../assets/images/logo.png')} style={styles.logo} /> */}
          <Text style={styles.title}>{t('chooseLanguageTitle')}</Text>

          <ButtonCompt
            title={t('languageEnglish')}
            onPress={() => changeLanguageAndNavigate('en')}
            isLoading={false}
            style={{marginTop: 20}}
            textStyle={{fontWeight: 'bold', textAlign: 'left'}}
            isOutline={true}
          />

          <ButtonCompt
            title={t('languageHindi')}
            onPress={() => changeLanguageAndNavigate('hi')}
            isLoading={false}
            style={{marginTop: 20}}
            textStyle={{fontWeight: 'bold'}}
            isOutline={true}
          />

          <ButtonCompt
            title={t('next')}
            onPress={() => navigation.navigate('InterestsScreen')}
            isLoading={false}
            style={{marginTop: 50}}
            textStyle={{fontWeight: 'bold'}}
          />
        </View>
      </ImageBackground>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {width: 100, height: 100, resizeMode: 'contain', marginBottom: 40},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: color.appColor,
    marginTop: 120,
  },
  button: {
    backgroundColor: '#EFEFEF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {fontSize: 16, fontWeight: '500'},
});

export default LanguageScreen;

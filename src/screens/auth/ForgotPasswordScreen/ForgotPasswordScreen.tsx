import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  ButtonCompt,
  InputCompt,
  PageContainer,
} from '../../../components/componentsIndex';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../../theme/color';
import imageIndex from '../../../assets/imageIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';

const ForgotPasswordScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');

  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

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
          <Text
            style={[
              styles.title,
              {
                fontSize: sizes.heading,
                color: colors.primary,
                fontFamily: fontFamily.semiBold,
              },
            ]}>
            {t('forgotPasswordTitle')}
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                fontSize: sizes.subheading,
                color: colors.text,
                fontFamily: fontFamily.regular,
                opacity: 0.8,
              },
            ]}>
            {t('forgotPasswordSubtitle')}
          </Text>
          <InputCompt
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            // error={!email.includes('@') ? 'Invalid email address' : ''}
            leftIcon={<Icon name="email" size={20} color="#888" />}
          />

          <ButtonCompt
            title={t('getOtpButton')}
            onPress={() => navigation.navigate('Verification')}
            isLoading={false}
            style={{marginTop: 20}}
          />

          <TouchableOpacity
            style={{position: 'absolute', bottom: 50, left: 0, right: 0}}
            onPress={() => navigation.goBack()}>
            <Text
              style={[
                styles.bottomLink,
                {
                  fontSize: sizes.body,
                  color: colors.background,
                  fontFamily: fontFamily.regular,
                },
              ]}>
              {t('rememberPasswordPrompt')}
            </Text>
          </TouchableOpacity>
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
  title: {
    marginBottom: 10,
    marginTop: 100,
  },
  subtitle: {
    marginBottom: 30,
  },

  forgotLink: {color: '#007BFF', textAlign: 'right', marginBottom: 20},

  orText: {textAlign: 'center', marginVertical: 20, color: 'gray'},

  bottomLink: {textAlign: 'center', marginTop: 30},
});
export default ForgotPasswordScreen;

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
import imageIndex from '../../../assets/imageIndex';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLanguage} from '../../../context/LanguageContext';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';

const SignUpScreen = ({navigation}: any) => {
  const {t} = useLanguage();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};

    if (!username.trim()) {
      newErrors.username = t('error_username_required');
    }

    if (!email.trim()) {
      newErrors.email = t('error_email_required');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = t('error_email_invalid');
    }

    if (!password) {
      newErrors.password = t('error_password_required');
    } else if (password.length < 6) {
      newErrors.password = t('error_password_short');
    }

    if (!repeatPassword) {
      newErrors.repeatPassword = t('error_repeat_password_required');
    } else if (repeatPassword !== password) {
      newErrors.repeatPassword = t('error_password_mismatch');
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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
          <Text
            style={[
              styles.title,
              {
                fontSize: sizes.heading,
                color: colors.primary,
                fontFamily: fontFamily.semiBold,
              },
            ]}>
            {t('signUpTitle')}
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
            {t('signUpSubtitle')}
          </Text>

          <InputCompt
            label={t("usernamePlaceholder")}
            placeholder={t('usernamePlaceholder')}
            value={username}
            onChangeText={setUsername}
            leftIcon={<Icon name="account-outline" size={20} color="#888" />}
            error={errors.username}
          />

          <InputCompt
            label={t("emailPlaceholder")}
            placeholder={t('emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            leftIcon={<Icon name="email-outline" size={20} color="#888" />}
            error={errors.email}
          />

          <InputCompt
            label={t("passwordPlaceholder")}
            placeholder={t('passwordPlaceholder')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={<Icon name="lock-outline" size={20} color="#888" />}
            error={errors.password}
          />

          <InputCompt
            label={t("repeatPasswordPlaceholder")}
            placeholder={t('repeatPasswordPlaceholder')}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            secureTextEntry
            leftIcon={<Icon name="lock-outline" size={20} color="#888" />}
            error={errors.repeatPassword}
          />

          <ButtonCompt
            title={t('signInButton')}
            onPress={() => {
              if (validateForm()) {
                navigation.navigate('Language');
              }
            }}
            isLoading={false}
            style={{marginTop: 20}}
          />

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text
              style={[
                styles.bottomLink,
                {
                  fontSize: sizes.body,
                  color: colors.text,
                  fontFamily: fontFamily.regular,
                },
              ]}>
              {t('hasAccountPrompt')}
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
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 30,
  },

  bottomLink: {textAlign: 'center', marginTop: 30},
});

export default SignUpScreen;

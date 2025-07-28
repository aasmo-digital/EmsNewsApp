import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Alert,
  Keyboard,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  ButtonCompt,
  InputCompt,
  PageContainer,
} from '../../../components/componentsIndex';
import imageIndex from '../../../assets/imageIndex';
import color from '../../../theme/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ApiRequest from '../../../services/api/ApiRequest';
import styles from './signin.style';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';

const SignInScreen = ({navigation}: any) => {
  // const {t} = useTranslation();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidPhone = () => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit starting with 6-9

    if (!phone || phone.trim() === '') {
      setError(t('error_phone_required'));
      return false;
    }

    if (!/^\d+$/.test(phone)) {
      setError(t('error_phone_digits_only'));
      return false;
    }

    if (phone.length !== 10) {
      setError(t('error_phone_exact_length'));
      return false;
    }

    if (!phoneRegex.test(phone)) {
      setError(t('error_phone_invalid'));
      return false;
    }

    setError('');
    return true;
  };

  // 🔁 OTP Call
  const onGetOtp = async () => {
    if (!isValidPhone()) return;
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: 'https://fakestoreapi.com/products',
        method: 'POST',
        request: {
          phone: phone,
        },
      });
      if (response) {
        setIsLoading(false);
        console.log('OTP Response:', response);
        // Alert.alert('Success', 'OTP sent successfully!');
        navigation.navigate('Verification', {phone: phone});
      } else {
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);

      console.error('OTP Error:', error.message);
      // Alert.alert('Error', error.message || 'Failed to send OTP');
    }
  };
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
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
            {t('signInTitle')}
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
            {t('signInSubtitle')}
          </Text>

          <InputCompt
            label={t('phone_number')}
            value={phone}
            onChangeText={setPhone}
            placeholder={t('enter_phone_number')}
            keyboardType="phone-pad"
            error={error}
            leftIcon={<Icon name="phone" size={20} color="#888" />}
            maxLength={10}
            inputStyle={{letterSpacing:1}}
          />

          <TouchableOpacity
            onPress={() => navigation.replace('ForgotPassword')}>
            <Text
              style={[
                styles.forgotLink,
                {
                  fontSize: sizes.subheading,
                  color: colors.text,
                  fontFamily: fontFamily.regular,
                },
              ]}>
              {t('forgotPasswordLink')}
            </Text>
          </TouchableOpacity>

          <ButtonCompt
            title={t('getOtpButton')}
            onPress={onGetOtp}
            isLoading={isLoading}
            style={{marginTop: 20}}
          />

          <Text
            style={[
              styles.orText,
              {
                fontSize: sizes.body,
                color: colors.text,
                fontFamily: fontFamily.regular,
              },
            ]}>
            {t('or')}
          </Text>

          <ButtonCompt
            title={t('signInWithGoogleButton')}
            onPress={() => {}}
            isLoading={false}
            style={{marginTop: 20}}
            isOutline={true}
          />

          <ButtonCompt
            title={t('signInWithFacebookButton')}
            onPress={() => {}}
            isLoading={false}
            style={{marginTop: 20}}
            isOutline={true}
          />

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={[
                styles.bottomLink,
                {
                  fontSize: sizes.body,
                  color: colors.text,
                  fontFamily: fontFamily.regular,
                },
              ]}>
              {t('noAccountPrompt')}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </PageContainer>
  );
};

export default SignInScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {
  ButtonCompt,
  InputCompt,
  PageContainer,
} from '../../../components/componentsIndex';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import imageIndex from '../../../assets/imageIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';

const ForgotPasswordScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
      setError(t('error_invalid_email'));
      return;
    }

    setError('');
    onGetOtp();
  };

  // 🔁 OTP Call
  const onGetOtp = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.forgotPassword,
        method: 'POST',
        request: {
          email: email,
        },
      });
      if (response) {
        setIsLoading(false);
        console.log('OTP Response:', response);
        // Alert.alert('Success', 'OTP sent successfully!');
        navigation.navigate('Verification');
      } else {
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('OTP Error:', error.message);
      // Alert.alert('Error', error.message || 'Failed to send OTP');
    }
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
        style={styles.imageBackground}
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
            label={t('emailPlaceholder')}
            value={email}
            onChangeText={text => {
              setEmail(text);
              setError('');
            }}
            placeholder={t('emailPlaceholder')}
            keyboardType="email-address"
            error={error}
            leftIcon={<Icon name="email-outline" size={20} color="#888" />}
          />

          <ButtonCompt
            title={t('getOtpButton')}
            onPress={handleSubmit}
            isLoading={isLoading}
            style={styles.button}
          />

          <TouchableOpacity
            style={styles.backLinkContainer}
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

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
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
  button: {
    marginTop: 20,
  },
  backLinkContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  bottomLink: {
    textAlign: 'center',
  },
});

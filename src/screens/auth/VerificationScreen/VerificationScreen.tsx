import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Alert,
  ActivityIndicator, // ADDED: To show validation messages
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  ButtonCompt,
  PageContainer,
  SuccessErrorModal,
} from '../../../components/componentsIndex';
import color from '../../../theme/color';
import imageIndex from '../../../assets/imageIndex';
import ApiRequest from '../../../services/api/ApiRequest';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../../services/redux/userReducer/reducer';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';

const OTP_LENGTH = 4; // Define the length of the OTP

const VerificationScreen = ({navigation}: any) => {
  const dummyResponse = {
    status: 'success',
    data: {
      user: {
        _id: '687f11229de23465ab12cd45',
        fullName: 'Kamlesh Gurjar',
        email: 'kamlesh@example.com',
        contactNo: '9876543210',
        role: 'user',
        createdAt: '2025-07-23T08:45:00.000Z',
        updatedAt: '2025-07-23T08:45:00.000Z',
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdmMTEyMjlkZTIzNDY1YWIxMmNkNDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1MzI3OTAwMH0.xZ7Cgm_BMzKNcm42Xj7fT9ltxyNYt0kKciwZj2D7UcQ',
    },
  };

  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  // const {t} = useTranslation();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isLoading, setIsLoading] = useState(false); // ADDED: For loading state
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [fetchloading, setFetchLoading] = useState(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // ADDED: Function to handle validation and navigation
  const validateAndNavigate = async (finalOtp: string) => {
    if (isLoading) return; // Prevent multiple submissions
    if (finalOtp.length !== OTP_LENGTH) return; // Only proceed if OTP is complete

    setIsLoading(true);
    console.log('Verifying OTP:', finalOtp);

    // --- Simulate API call for validation ---
    // In a real app, you would replace this with your backend API call.
    // We'll pretend '1234' is the correct code for demonstration.
    setTimeout(() => {
      if (finalOtp === '1234') {
        console.log('Validation successful!');

        dispatch(loginSuccess({accessToken: dummyResponse.token}));

        navigation.replace('App');
      } else {
        console.log('Validation failed.');
        Alert.alert(
          'Invalid Code',
          'The code you entered is incorrect. Please try again.',
        );
        // Reset inputs on failure
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
      }
      setIsLoading(false);
    }, 1000); // Simulate 1-second delay
  };

  // MODIFIED: handleOtpChange to trigger validation automatically
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // If the last input is filled, trigger validation
    if (text && index === OTP_LENGTH - 1) {
      const finalOtp = newOtp.join('');
      validateAndNavigate(finalOtp);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // MODIFIED: handlePaste to also trigger validation
  const handlePaste = (text: string, startIndex: number) => {
    const newOtp = [...otp];
    const pastedDigits = text.slice(0, OTP_LENGTH - startIndex).split('');

    pastedDigits.forEach((digit, i) => {
      const pasteIndex = startIndex + i;
      if (pasteIndex < OTP_LENGTH) {
        newOtp[pasteIndex] = digit;
      }
    });

    setOtp(newOtp);

    const nextFocusIndex = Math.min(
      startIndex + pastedDigits.length,
      OTP_LENGTH - 1,
    );
    inputRefs.current[nextFocusIndex]?.focus();

    // If paste filled the code, trigger validation
    const finalOtp = newOtp.join('');
    if (finalOtp.length === OTP_LENGTH) {
      validateAndNavigate(finalOtp);
    }
  };

  // 🔁 OTP Call
  const onGetOtp = async () => {
    setFetchLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: 'https://fakestoreapi.com/products/1',
        method: 'GET',
      });
      if (response) {
        setFetchLoading(false);
        setModalVisible(!modalVisible);
        console.log('OTP Response:', response);
      } else {
        setFetchLoading(false);
      }
    } catch (error: any) {
      setFetchLoading(false);

      console.error('OTP Error:', error.message);
      Alert.alert('Error', error.message || 'Failed to send OTP');
    }
  };

  useEffect(() => {
    onGetOtp();
  }, []);
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

  return (
    <PageContainer
      scroll
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
            {t('verificationTitle')}
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
            {t('verificationSubtitle')}
          </Text>

          <View style={styles.otpContainer}>
            {Array(OTP_LENGTH)
              .fill(0)
              .map((_, index) => (
                <TextInput
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    {
                      fontSize: sizes.subheading,
                      color: colors.text,
                      fontFamily: fontFamily.semiBold,
                      backgroundColor: colors.backgroundColor,
                    },
                  ]}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={otp[index]}
                  onChangeText={text => {
                    if (text.length > 1) {
                      handlePaste(text, index);
                    } else {
                      handleOtpChange(text, index);
                    }
                  }}
                  onKeyPress={e => handleKeyPress(e, index)}
                  textContentType="oneTimeCode"
                  editable={!isLoading} // Disable input during validation
                />
              ))}
          </View>

          {/* MODIFIED: Button now uses the validation logic and loading state */}
          <ButtonCompt
            title={t('getOtpButton')}
            onPress={() => validateAndNavigate(otp.join(''))}
            isLoading={isLoading}
            style={{marginTop: 20}}
          />

          <TouchableOpacity disabled={isLoading}>
            <Text
              style={[
                styles.bottomLink,
                {
                  fontSize: sizes.body,
                  color: colors.text,
                  fontFamily: fontFamily.regular,
                },
              ]}>
              {t('resendCodePrompt')}
            </Text>
          </TouchableOpacity>
        </View>

        {fetchloading && (
          <ActivityIndicator
            color={color.appColor}
            size={'large'}
            style={{position: 'absolute', bottom: 30, alignSelf: 'center'}}
          />
        )}
      </ImageBackground>

      <SuccessErrorModal
        visible={modalVisible}
        imageSource={imageIndex?.success}
        title="1 2 3 4"
        subtitle={`${'Your otp is fetch successfully.'}`}
        onClose={() => setModalVisible(false)}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    alignSelf: 'center',
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 60,
    height: 60,
    textAlign: 'center',
    borderRadius: 10,
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 40,
  },
  bottomLink: {
    textAlign: 'center',
    marginTop: 30,
  },
});

export default VerificationScreen;

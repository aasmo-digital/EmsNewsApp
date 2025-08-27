// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   StatusBar,
//   Alert,
//   Keyboard,
//   Image,
//   BackHandler,
// } from 'react-native';
// import {useTranslation} from 'react-i18next';
// import {
//   ButtonCompt,
//   InputCompt,
//   PageContainer,
// } from '../../../components/componentsIndex';
// import imageIndex from '../../../assets/imageIndex';
// import color from '../../../theme/color';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import ApiRequest from '../../../services/api/ApiRequest';
// import styles from './signin.style';
// import {useFontSize} from '../../../context/FontSizeContext';
// import {useTheme} from '../../../context/ThemeContext';
// import {useLanguage} from '../../../context/LanguageContext';
// import LanguageSelectorPopup from '../../../components/common/LanguageSelectorPopup';
// import {useSelector} from 'react-redux';
// import {RootState} from '../../../services/redux/store';
// import ApiRoutes from '../../../services/config/ApiRoutes';

// const SignInScreen = ({navigation}: any) => {
//   // const {t} = useTranslation();
//   const [phone, setPhone] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [languageModalVisible, setLanguageModalVisible] = useState(false);
//   const {sizes, fontFamily} = useFontSize();
//   const {colors} = useTheme();
//   const {t} = useLanguage();

//   const isLogin = useSelector((state: RootState) => state?.UserData?.isLogin);

//   const isValidPhone = () => {
//     const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit starting with 6-9

//     if (!phone || phone.trim() === '') {
//       setError(t('error_phone_required'));
//       return false;
//     }

//     if (!/^\d+$/.test(phone)) {
//       setError(t('error_phone_digits_only'));
//       return false;
//     }

//     if (phone.length !== 10) {
//       setError(t('error_phone_exact_length'));
//       return false;
//     }

//     if (!phoneRegex.test(phone)) {
//       setError(t('error_phone_invalid'));
//       return false;
//     }

//     setError('');
//     return true;
//   };

//   // 🔁 OTP Call
//   const onGetOtp = async () => {
//     if (!isValidPhone()) return;
//     Keyboard.dismiss();
//     setIsLoading(true);
//     try {
//       const response = await ApiRequest({
//         BaseUrl: ApiRoutes.login,
//         method: 'POST',
//         request: {
//           phone: phone,
//         },
//       });
//       if (response) {
//         setIsLoading(false);
//         console.log('OTP Response:', response);
//         // Alert.alert('Success', 'OTP sent successfully!');
//         navigation.navigate('Verification', {phone: phone});
//       } else {
//         setIsLoading(false);
//       }
//     } catch (error: any) {
//       setIsLoading(false);
//       console.error('OTP Error:', error.message);
//       // Alert.alert('Error', error.message || 'Failed to send OTP');
//     }
//   };

//   useEffect(() => {
//     if (isLogin) {
//       setLanguageModalVisible(false);
//     } else {
//       setLanguageModalVisible(true);
//     }
//   }, []);

//   useEffect(() => {
//     const backAction = () => {
//       BackHandler.exitApp(); // App exit karega
//       return true; // default back behavior ko override karega
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     return () => backHandler.remove();
//   }, []);

//   return (
//     <PageContainer
//       statusBarProps={{
//         backgroundColor: 'transparent',
//         barStyle: 'dark-content',
//         translucent: true,
//       }}>
//       <ImageBackground
//         source={imageIndex.bg}
//         style={{flex: 1}}
//         resizeMode="stretch">
//         <View style={styles.container}>
//           <Text
//             style={[
//               styles.title,
//               {
//                 fontSize: sizes.heading,
//                 color: colors.primary,
//                 fontFamily: fontFamily.semiBold,
//               },
//             ]}>
//             {t('signInTitle')}
//           </Text>
//           <Text
//             style={[
//               styles.subtitle,
//               {
//                 fontSize: sizes.subheading,
//                 color: colors.text,
//                 fontFamily: fontFamily.regular,
//                 opacity: 0.8,
//               },
//             ]}>
//             {t('signInSubtitle')}
//           </Text>

//           <InputCompt
//             label={t('phone_number')}
//             value={phone}
//             onChangeText={setPhone}
//             placeholder={t('enter_phone_number')}
//             keyboardType="phone-pad"
//             error={error}
//             leftIcon={<Icon name="phone" size={20} color="#888" />}
//             maxLength={10}
//             inputStyle={{letterSpacing: 1}}
//           />

//           <TouchableOpacity
//             onPress={() => navigation.replace('ForgotPassword')}>
//             <Text
//               style={[
//                 styles.forgotLink,
//                 {
//                   fontSize: sizes.subheading,
//                   color: colors.text,
//                   fontFamily: fontFamily.regular,
//                 },
//               ]}>
//               {t('forgotPasswordLink')}
//             </Text>
//           </TouchableOpacity>

//           <ButtonCompt
//             title={t('getOtpButton')}
//             onPress={onGetOtp}
//             isLoading={isLoading}
//             style={{marginTop: 20}}
//           />

//           <Text
//             style={[
//               styles.orText,
//               {
//                 fontSize: sizes.body,
//                 color: colors.text,
//                 fontFamily: fontFamily.regular,
//               },
//             ]}>
//             {t('or')}
//           </Text>

//           <ButtonCompt
//             title={t('signInWithGoogleButton')}
//             onPress={() => {}}
//             isLoading={false}
//             style={{marginTop: 20}}
//             isOutline={true}
//             rightImage={
//               <Image
//                 source={imageIndex.google}
//                 style={{height: 25, width: 25}}
//               />
//             }
//           />

//           <ButtonCompt
//             title={t('signInWithFacebookButton')}
//             onPress={() => {}}
//             isLoading={false}
//             style={{marginTop: 20}}
//             isOutline={true}
//             rightImage={
//               <Image
//                 source={imageIndex.facebook}
//                 style={{height: 25, width: 25}}
//               />
//             }
//           />

//           <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//             <Text
//               style={[
//                 styles.bottomLink,
//                 {
//                   fontSize: sizes.body,
//                   color: colors.text,
//                   fontFamily: fontFamily.regular,
//                 },
//               ]}>
//               {t('noAccountPrompt')}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>

//       <LanguageSelectorPopup
//         visible={languageModalVisible}
//         onClose={() => setLanguageModalVisible(false)}
//       />
//     </PageContainer>
//   );
// };

// export default SignInScreen;

import React, {useEffect, useState} from 'react';
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
  Image,
  BackHandler,
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
import LanguageSelectorPopup from '../../../components/common/LanguageSelectorPopup';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../services/redux/store';
import ApiRoutes from '../../../services/config/ApiRoutes';
import {loginSuccess} from '../../../services/redux/userReducer/reducer';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../utility/HelperFuntions';

const SignInScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const isLogin = useSelector((state: RootState) => state?.UserData?.isLogin);

  const isValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email.trim() === '') {
      setError(t('error_email_required'));
      return false;
    }

    if (!emailRegex.test(email)) {
      setError(t('error_email_invalid'));
      return false;
    }

    if (!password || password.trim() === '') {
      setError(t('error_password_required'));
      return false;
    }

    if (password.length < 5) {
      setError(t('error_password_min_length'));
      return false;
    }

    setError('');
    return true;
  };

  const dispatch = useDispatch();

  // 🔁 OTP Call
  const onSignIn = async () => {
    if (!isValid()) return;
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.login,
        method: 'POST',
        request: {
          email: email,
          password: password,
        },
      });

      if (response?.token || response?.message) {
        setIsLoading(false);
        showSuccessToast('Login Success', response.message);
        dispatch(loginSuccess({accessToken: response.token}));
        navigation.replace('App');
      } else {
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Login Error:', error.message);
      showErrorToast('Login Failed', error.message);
    }
  };

  useEffect(() => {
    if (isLogin) {
      setLanguageModalVisible(false);
    } else {
      setLanguageModalVisible(true);
    }
  }, []);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // App exit karega
      return true; // default back behavior ko override karega
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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
            label={t('email_address')}
            value={email}
            onChangeText={setEmail}
            placeholder={t('enter_email_address')}
            keyboardType="email-address"
            error={error}
            leftIcon={<Icon name="email" size={20} color="#888" />}
            inputStyle={{letterSpacing: 1}}
          />

          <InputCompt
            label={t('password')}
            value={password}
            onChangeText={setPassword}
            placeholder={t('enter_password')}
            secureTextEntry={secureTextEntry}
            error={error}
            leftIcon={<Icon name="lock" size={20} color="#888" />}
            rightIcon={
              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Icon
                  name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            }
            maxLength={10}
            inputStyle={{letterSpacing: 1}}
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
            title={t('signInButton')}
            onPress={onSignIn}
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
            style={{marginTop: 5}}
            isOutline={true}
            rightImage={
              <Image
                source={imageIndex.google}
                style={{height: 25, width: 25}}
              />
            }
          />

          <ButtonCompt
            title={t('signInWithFacebookButton')}
            onPress={() => {}}
            isLoading={false}
            style={{marginTop: 20}}
            isOutline={true}
            rightImage={
              <Image
                source={imageIndex.facebook}
                style={{height: 25, width: 25}}
              />
            }
          />

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={[
                styles.bottomLink,
                {
                  fontSize: sizes.subheading,
                  color: colors.text,
                  fontFamily: fontFamily.medium,
                },
              ]}>
              {t('noAccountPrompt')}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <LanguageSelectorPopup
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
      />
    </PageContainer>
  );
};

export default SignInScreen;

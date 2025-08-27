import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import styles from './style.signup';

const SignUpScreen = ({navigation}: any) => {
  const {t} = useLanguage();
  const [profileImage, setProfileImage] = useState(null);
  const [phone, setPhone] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};
    const phoneRegex = /^[6-9]\d{9}$/;

    // if (!phone || phone.trim() === '') {
    //   newErrors.phone = t('error_phone_required');
    // } else if (!/^\d+$/.test(phone)) {
    //   newErrors.phone = t('error_phone_digits_only');
    // } else if (phone.length !== 10) {
    //   newErrors.phone = t('error_phone_exact_length');
    // } else if (!phoneRegex.test(phone)) {
    //   newErrors.phone = t('error_phone_invalid');
    // }

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

  const request = {
    // phone,
    name: username,
    email: email,
    password: password,
    profileImageFile: {
      uri: profileImage?.uri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    },
  };

  const onSignUp = async () => {
    console.log('----', request);
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.signup,
        method: 'POST',
        isMultipart: true,
        request,
      });
      console.log(' SignUp Response==========:', response);

      if (response?.data) {
        setIsLoading(false);
        navigation.navigate('SignIn');
        // navigation.navigate('Verification', {phone: phone});
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error?.message);
    }
  };

  // --- FUNCTION TO HANDLE IMAGE SELECTION ---
  const handleImageSelection = () => {
    Alert.alert(
      t('select_profile_picture_text'), // "Select Profile Picture"
      t('choose_an_option_text'), // "Choose an option"
      [
        {
          text: t('camera_text'), // "Camera"
          onPress: () => openCamera(),
        },
        {
          text: t('gallery_text'), // "Gallery"
          onPress: () => openGallery(),
        },
        {
          text: t('cancel_text'), // "Cancel"
          style: 'cancel',
        },
      ],
    );
  };

  const imagePickerOptions = {
    mediaType: 'photo',
    quality: 0.8,
  };

  const openCamera = async () => {
    const result = await launchCamera(imagePickerOptions);
    if (result.didCancel) {
      console.log('User cancelled camera picker');
    } else if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
    } else {
      setProfileImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(imagePickerOptions);
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
    } else {
      setProfileImage(result.assets[0].uri);
    }
  };

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
        style={{flex: 1, paddingTop: 60, paddingBottom: 250}}
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

          {/* --- PROFILE IMAGE SECTION --- */}
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handleImageSelection}>
              <View
                style={[
                  styles.avatarContainer,
                  {backgroundColor: colors.card, borderColor: colors.primary},
                ]}>
                {profileImage ? (
                  <Image source={{uri: profileImage}} style={styles.avatar} />
                ) : (
                  <Icon name="account-outline" size={60} color={colors.text} />
                )}
              </View>
              <View
                style={[
                  styles.editIconContainer,
                  {
                    backgroundColor: colors.primary,
                    borderColor: colors.background,
                  },
                ]}>
                <Icon name="camera-plus-outline" size={18} color={'#fff'} />
              </View>
            </TouchableOpacity>
          </View>

          {/* <InputCompt
            label={t('phone_number')}
            value={phone}
            onChangeText={setPhone}
            placeholder={t('enter_phone_number')}
            keyboardType="phone-pad"
            error={errors.phone}
            leftIcon={<Icon name="phone" size={20} color="#888" />}
            maxLength={10}
            inputStyle={{letterSpacing: 1}}
          /> */}
          {/* --- END PROFILE IMAGE SECTION --- */}
          <InputCompt
            label={t('usernamePlaceholder')}
            placeholder={t('usernamePlaceholder')}
            value={username}
            onChangeText={setUsername}
            leftIcon={<Icon name="account-outline" size={20} color="#888" />}
            error={errors.username}
          />

          <InputCompt
            label={t('emailPlaceholder')}
            placeholder={t('emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            leftIcon={<Icon name="email-outline" size={20} color="#888" />}
            error={errors.email}
          />

          <InputCompt
            label={t('passwordPlaceholder')}
            placeholder={t('passwordPlaceholder')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={<Icon name="lock-outline" size={20} color="#888" />}
            error={errors.password}
          />

          <InputCompt
            label={t('repeatPasswordPlaceholder')}
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
                onSignUp();
              }
            }}
            isLoading={isLoading}
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

export default SignUpScreen;

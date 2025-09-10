import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonCompt,
  HeaderCompt,
  InputCompt,
  PageContainer,
} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ApiRequest from '../../../services/api/ApiRequest';
import color from '../../../theme/color';
import ApiRoutes from '../../../services/config/ApiRoutes';
import {useSelector} from 'react-redux';

const EditProfile = () => {
  const {colors, mode} = useTheme();
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fetchloading, setFetchLoading] = useState(false);

  const {t} = useLanguage();

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!username.trim()) {
      newErrors.username = t('error_username_required');
    }

    if (!phone || phone.trim() === '') {
      newErrors.phone = t('error_phone_required');
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = t('error_phone_digits_only');
    } else if (phone.length !== 10) {
      newErrors.phone = t('error_phone_exact_length');
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = t('error_phone_invalid');
    }

    if (!email.trim()) {
      newErrors.email = t('error_email_required');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = t('error_email_invalid');
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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

  const token = useSelector(state => state?.UserData?.token);

  // 🔁 getProfile Call
  const getProfile = async () => {
    setFetchLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getProfileById,
        method: 'GET',
        token: token,
      });

      console.log('---------gjk fknf----------', response);
      if (response?.success) {
        setFetchLoading(false);
        setUsername(response?.data?.name);
        setEmail(response?.data?.email);
        // setPhone(response?.data?.email);
        console.log('getProfile Response:', response);
      } else {
        setFetchLoading(false);
      }
    } catch (error: any) {
      setFetchLoading(false);

      console.error('getProfile Error:', error.message);
      Alert.alert('Error', error.message || 'Failed to send getProfile');
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <PageContainer style={{paddingTop: 25}}>
      <View style={{flex: 1}}>
        <HeaderCompt title={t('edit_profile_text')} />

        {fetchloading ? (
          <ActivityIndicator
            color={color.appColor}
            size={'large'}
            style={{flex: 1}}
          />
        ) : (
          <View style={{paddingHorizontal: 16}}>
            {/* --- PROFILE IMAGE SECTION --- */}
            <View style={dynamicStyles.imageContainer}>
              <TouchableOpacity onPress={handleImageSelection}>
                <View
                  style={[
                    dynamicStyles.avatarContainer,
                    {backgroundColor: colors.card, borderColor: colors.primary},
                  ]}>
                  {profileImage ? (
                    <Image
                      source={{uri: profileImage}}
                      style={dynamicStyles.avatar}
                    />
                  ) : (
                    <Icon
                      name="account-outline"
                      size={60}
                      color={colors.text}
                    />
                  )}
                </View>
                <View
                  style={[
                    dynamicStyles.editIconContainer,
                    {
                      backgroundColor: colors.primary,
                      borderColor: colors.background,
                    },
                  ]}>
                  <Icon name="camera-plus-outline" size={18} color={'#fff'} />
                </View>
              </TouchableOpacity>
            </View>
            {/* --- END PROFILE IMAGE SECTION --- */}
            <InputCompt
              label={t('usernamePlaceholder')}
              placeholder={t('usernamePlaceholder')}
              value={username}
              onChangeText={setUsername}
              leftIcon={<Icon name="account-outline" size={20} color="#888" />}
              error={errors.username}
            />

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

            <InputCompt
              label={t('emailPlaceholder')}
              placeholder={t('emailPlaceholder')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              leftIcon={<Icon name="email-outline" size={20} color="#888" />}
              error={errors.email}
            />

            {/* <ButtonCompt
            title={t('update_text')}
            onPress={validateForm}
            isLoading={false}
            style={{marginTop: 20}}
          /> */}
          </View>
        )}
      </View>
    </PageContainer>
  );
};

export default EditProfile;

const dynamicStyles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 5,

    borderRadius: 15,
    padding: 6,
    borderWidth: 2,
  },
});

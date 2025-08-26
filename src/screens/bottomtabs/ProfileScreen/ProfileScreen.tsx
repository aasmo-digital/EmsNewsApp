import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  Modal,
  StyleSheet,
  Share,
  Linking,
  Pressable,
} from 'react-native';
import FontSizeModal from '../../../components/common/FontSizeModal';

import {useDispatch} from 'react-redux';
import {logoutSucces} from '../../../services/redux/userReducer/reducer';
import {useNavigation} from '@react-navigation/native';
import {
  ButtonCompt,
  CustomSwitchButton,
  FontFamilyModal,
  HeaderCompt,
  PageContainer,
} from '../../../components/componentsIndex';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {useFontSize} from '../../../context/FontSizeContext';
import color from '../../../theme/color';
import LanguageSelectorPopup from '../../../components/common/LanguageSelectorPopup';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {sizes, fontFamily, setFontName} = useFontSize();
  const {colors, toggleTheme, mode} = useTheme();
  const {t, setLanguage} = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const [fontFamilyModalVisible, setFontFamilyModalVisible] = useState(false);

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logoutSucces());
    navigation.navigate('Splash');
  };

  // console.log('fontFamily.bold:======================', fontFamily.bold);

  console.log('colors======================', colors);

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        title: 'MyApp Name',
        message:
          'Check out this awesome app called MyApp! Download it now from:\nhttps://play.google.com/store/apps/details?id=com.myapp',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error('Error sharing the app:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background, paddingTop: 25}}>
      <HeaderCompt
        title={t('more_text')}
        titleStyle={{fontFamily: fontFamily.semiBold}}
      />

      <PageContainer scroll>
        <View style={{flex: 1, padding: 16}}>
          <Pressable
            onPress={() => navigation.navigate('EditProfile')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
              }}
              style={{height: 80, width: 80, borderRadius: 50}}
            />
            <View style={{flex: 1, marginLeft: 10}}>
              <Text
                style={{
                  fontSize: sizes.heading,
                  color: colors.text,
                  textTransform: 'capitalize',
                  fontFamily: fontFamily.bold,
                  letterSpacing: 0.5,
                }}>
                aMAR PATEL
              </Text>
              <Text
                style={{
                  fontSize: sizes.subheading,
                  color: colors.text,
                  fontFamily: fontFamily.medium,
                  letterSpacing: 0.5,
                }}>
                ag@gmail.com
              </Text>
              <Text
                style={{
                  fontSize: sizes.body,
                  color: color.warning,
                  fontFamily: fontFamily.semiBold,
                  letterSpacing: 0.5,
                }}>
                {t('id')}: EGOL5246F
              </Text>
            </View>
          </Pressable>
          <ButtonCompt
            title={t('notifications')}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <CustomSwitchButton
                isOn={notificationsEnabled}
                onToggle={val => setNotificationsEnabled(val)}
              />
            }
            textStyle={{color: colors.text}}
          />
          <ButtonCompt
            title={t('dark_mode')}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <CustomSwitchButton
                isOn={mode === 'dark'}
                onToggle={toggleTheme}
              />
            }
            textStyle={{color: colors.text}}
          />
          <ButtonCompt
            title={t('language')}
            onPress={() => setLanguageModalVisible(true)}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            }
            textStyle={{color: colors.text}}
          />
          <ButtonCompt
            title={t('change_password')}
            onPress={() => navigation.navigate('ChanegPassword')}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            }
            textStyle={{color: colors.text}}
          />
          <ButtonCompt
            title={t('ems_news')}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            }
            textStyle={{color: colors.text}}
          />
          <ButtonCompt
            title={t('privacy')}
            onPress={() => navigation.navigate('Privacy')}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            }
            textStyle={{color: colors.text}}
          />
          <ButtonCompt
            title={t('terms_and_conditions')}
            onPress={() => navigation.navigate('TermsConditon')}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            }
            textStyle={{color: colors.text}}
          />

          <ButtonCompt
            title={t('invite_friend')}
            onPress={handleShareApp}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            }
            textStyle={{color: colors.text}}
          />

          <ButtonCompt
            title={t('rate_app')}
            onPress={() =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.instagram.android',
              )
            }
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            }
            textStyle={{color: colors.text}}
          />

          <ButtonCompt
            title={t('favorite_topics')}
            onPress={() => navigation.navigate('InterestsScreen')}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            }
            textStyle={{color: colors.text}}
          />

          <ButtonCompt
            title={t('select_state_city')}
            onPress={() => navigation.navigate('PickYourState')}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            }
            textStyle={{color: colors.text}}
          />

          <ButtonCompt
            title={t('font_settings')}
            onPress={() => setModalVisible(true)}
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            }
            textStyle={{color: colors.text}}
          />
          <ButtonCompt
            title={t('font_family')}
            onPress={() => setFontFamilyModalVisible(true)} // Create this state handler
            style={{
              marginTop: 10,
              backgroundColor: colors.card,
              borderWidth: 0.45,
            }}
            isOutline={true}
            rightImage={
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            }
            textStyle={{color: colors.text}}
          />

          <ButtonCompt
            title={t('logout')}
            onPress={handleLogout}
            style={{
              marginTop: 10,
              backgroundColor: color.warning,
              borderWidth: 0,
            }}
            textStyle={{color: color.white}}
            isOutline={true}
            rightImage={
              <Ionicons name="log-out-outline" size={25} color={color.white} />
            }
          />
        </View>

        {/* Modal */}
        <FontSizeModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />

        <FontFamilyModal
          visible={fontFamilyModalVisible}
          onClose={() => setFontFamilyModalVisible(false)}
        />

        <LanguageSelectorPopup
          visible={languageModalVisible}
          onClose={() => setLanguageModalVisible(false)}
        />
      </PageContainer>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 100,
  },
  fontOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  fontOptionText: {
    fontSize: 16,
    color: '#000',
  },
});

// import { useFontSize } from '../context/FontContext';
// import { useTheme } from '../context/ThemeContext';
// import { useLanguage } from '../context/LanguageContext';
// import { Text, View, Button } from 'react-native';

// const SettingsScreen = () => {
//   const { sizes, fontFamily, setFontName } = useFontSize();
//   const { colors, toggleTheme } = useTheme();
//   const { t, setLanguage } = useLanguage();

//   return (
//     <View style={{ backgroundColor: colors.background, flex: 1, padding: 20 }}>
//       <Text
//         style={{
//           fontSize: sizes.heading,
//           color: colors.text,
//           fontFamily: fontFamily.bold,
//         }}>
//         {t('settings')}
//       </Text>

//       <Button title="Switch Theme" onPress={toggleTheme} />
//       <Button title="Use Khand" onPress={() => setFontName('Khand')} />
//       <Button title="Use Poppins" onPress={() => setFontName('Poppins')} />
//       <Button title="Switch to Hindi" onPress={() => setLanguage('hi')} />
//     </View>
//   );
// };

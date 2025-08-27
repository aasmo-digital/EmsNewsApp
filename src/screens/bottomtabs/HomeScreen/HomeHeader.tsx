import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import imageIndex from '../../../assets/imageIndex';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/image/epaper.svg';
import {useTheme} from '../../../context/ThemeContext';

const HomeHeader = () => {
  const {colors, mode} = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Image
        source={imageIndex.logo}
        style={{height: 80, width: 50}}
        resizeMode="contain"
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable
          onPress={() => navigation.navigate('Explore')}
          style={{marginRight: 10}}>
          <Ionicons name={'search-outline'} size={24} color={colors.text} />
        </Pressable>
        <Pressable
          style={{marginRight: 10}}
          onPress={() => Linking.openURL('http://www.jabalpurexpress.com/')}>
          {/*   onPress={() => navigation.navigate('EPaper')}>
           <Text
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              color: colors.btnbg,
              borderColor: colors.btnbg,
              fontFamily: fontFamily.medium,
              fontSize: sizes.body,
            }}>
            {t('epaper_text')}
          </Text> */}

          <Logo width={25} height={25} fill={colors.text} />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('EmsTv')}
          style={{marginRight: 10}}>
          <Image
            source={imageIndex.tv}
            style={{height: 25, width: 25, tintColor: colors.text}}
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Notification')}
          style={{marginRight: 10}}>
          <Image
            source={imageIndex.notification}
            style={{height: 25, width: 25, tintColor: colors.text}}
          />
        </Pressable>
        {/* <Pressable
          onPress={() => navigation.navigate('EditProfile')}
          style={{marginRight: 10}}>
          <Image
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
            }}
            style={{height: 35, width: 35, borderRadius: 50}}
          />
        </Pressable> */}
      </View>
    </View>
  );
};

export default HomeHeader;

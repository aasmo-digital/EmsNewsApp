import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import imageIndex from '../../../assets/imageIndex';
import {useNavigation} from '@react-navigation/native';
import {NewsCardLoading} from '../../../components/skelotonindex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/redux/store';

const LiveNewsCard = () => {
  const allNeewsLoading = false;

  const allNeews = useSelector((state: RootState) => state.news.news);

  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

  const navigation = useNavigation();
  return allNeewsLoading ? (
    <NewsCardLoading />
  ) : (
    <View
      style={{
        padding: 10,
        backgroundColor: colors.card,
        margin: 10,
        borderRadius: 10,
      }}>
      <Text
        style={{
          fontSize: sizes.subheading,
          color: colors.text,
          fontFamily: fontFamily.semiBold,
        }}
        numberOfLines={2}>
        {allNeews[0]?.title}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: sizes.subheading,
            color: colors.text,
            fontFamily: fontFamily.semiBold,
          }}>
          Nature Channel
        </Text>
        <Text
          style={{
            backgroundColor: colors.text,
            borderRadius: 50,
            alignSelf: 'center',
            height: 10,
            width: 10,
            marginHorizontal: 5,
            opacity: 0.5,
          }}
        />
        <Image style={{height: 25, width: 50}} source={imageIndex.live} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() =>
            navigation.navigate('NewsDetail', {news: allNeews?.[0]})
          }>
          <Image
            source={{uri: allNeews[0]?.media[0]?.url}}
            style={{height: 200, width: 220, borderRadius: 10}}
          />
        </Pressable>
        <View>
          <Pressable
            style={{marginBottom: 5}}
            onPress={() =>
              navigation.navigate('NewsDetail', {news: allNeews?.[1]})
            }>
            <Image
              source={{uri: allNeews[1]?.media[0]?.url}}
              style={{height: 100, width: 100, borderRadius: 10}}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('NewsDetail', {news: allNeews?.[2]})
            }>
            <Image
              source={{uri: allNeews[2]?.media[0]?.url}}
              style={{height: 100, width: 100, borderRadius: 10}}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LiveNewsCard;

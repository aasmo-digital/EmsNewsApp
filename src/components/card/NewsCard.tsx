import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {memo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure you have this library
import {LikeCompt} from '../componentsIndex';
import color from '../../theme/color';
import imageIndex from '../../assets/imageIndex';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ApiRequest from '../../services/api/ApiRequest';
import ApiRoutes from '../../services/config/ApiRoutes';
import {useSelector} from 'react-redux';

const NewsCard = ({item, location, onPressLocation, onPressCard}: any) => {
  const token = useSelector(state => state?.UserData?.token);

  const navigation = useNavigation();
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const [isWishListed, setIsWishListed] = useState(item?.isSaved || false);

  const addremoveSaved = async () => {
    const response = await ApiRequest({
      BaseUrl: ApiRoutes.addremoveWishList + item?._id,
      method: 'POST',
      token: token,
    });

    if (response?.success) {
      setIsWishListed(!isWishListed);
    } else {
      setIsWishListed(isWishListed);
    }
  };

  return (
    <Pressable
      style={[
        styles.card,
        {shadowColor: colors.text, backgroundColor: colors.card},
      ]}
      onPress={
        onPressCard
          ? onPressCard
          : () => navigation.navigate('NewsDetail', {news: item})
      }>
      <View style={{flex: 1, marginRight: 8}}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontFamily: fontFamily.semiBold,
              fontSize: sizes.subheading,
            },
          ]}
          numberOfLines={1}>
          {item?.title}
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: sizes.body,
            fontFamily: fontFamily.regular,
            letterSpacing: 0.5,
          }}
          numberOfLines={2}>
          {item?.summary}
        </Text>
        <View style={styles.interactionBar}>
          <LikeCompt item={item} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Comments', {item: item})}
            style={styles.interactionItem}>
            <Icon name="comment-o" size={20} color={colors.text} />
            <Text
              style={[
                styles.interactionText,
                {
                  fontSize: sizes.body,
                  color: colors.text,
                  fontFamily: fontFamily.semiBold,
                },
              ]}>
              {item?.commentsCount}
            </Text>
          </TouchableOpacity>
          <Pressable onPress={addremoveSaved} style={styles.interactionItem}>
            {/* <Icon name="bookmark-o" size={20} color={color.warning}   /> */}
            <Image
              source={isWishListed ? imageIndex.addsave : imageIndex.removesave}
              style={{
                height: 18,
                width: 18,
                tintColor: isWishListed ? color.warning : colors.text,
              }}
            />
            <Text
              style={[
                styles.interactionText,
                {
                  fontSize: sizes.body,
                  color: colors.text,
                  fontFamily: fontFamily.regular,
                },
              ]}>
              {/* {item?.bookmarks} */}
            </Text>
          </Pressable>
        </View>

        {location && (
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: color.lightgray,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 50,
              flexDirection: 'row',
              alignSelf: 'flex-start',
            }}
            onPress={onPressLocation}>
            <Text
              style={{
                color: colors.text,
                fontFamily: fontFamily.medium,
                fontSize: sizes.body,

                textTransform: 'capitalize',
              }}>
              {location?.length > 25 ? location.slice(0, 25) + '...' : location}
            </Text>

            <Image
              style={{
                height: 15,
                width: 15,
                tintColor: colors.text,
                paddingLeft: 30,
                resizeMode: 'center',
              }}
              source={imageIndex.rightarrow}
            />
          </Pressable>
        )}
      </View>

      <Image
        source={{
          uri: item?.media[0].url,
        }}
        style={styles.image}
      />
    </Pressable>
  );
};

export default memo(NewsCard);

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    opacity: 0.8,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  interactionText: {
    marginLeft: 6,
    letterSpacing: 1,
  },
});

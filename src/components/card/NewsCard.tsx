import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure you have this library
import {Image, LikeCompt} from '../componentsIndex';
import color from '../../theme/color';

const NewsCard = ({item, location, onPressLocation, onPressCard}: any) => {
  const navigation = useNavigation();
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();

  // console.log('------item--', item);

  return (
    <Pressable
      style={[
        styles.card,
        {shadowColor: colors.text, backgroundColor: colors.background},
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
            onPress={() =>
              navigation.navigate('Comments', {comments: item?.comments})
            }
            style={styles.interactionItem}>
            <Icon name="comment-o" size={20} color={colors.text} />
            <Text
              style={[
                styles.interactionText,
                {
                  fontSize: sizes.body,
                  color: colors.text,
                  fontFamily: fontFamily.regular,
                },
              ]}>
              {item?.commentsCount}
            </Text>
          </TouchableOpacity>
          <View style={styles.interactionItem}>
            <Icon name="bookmark-o" size={20} color={colors.text} />
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
          </View>
        </View>

        {location && (
          <Pressable onPress={onPressLocation}>
            <Text
              style={{
                alignSelf: 'flex-start',
                color: colors.text,
                fontFamily: fontFamily.medium,
                fontSize: sizes.body,
                borderWidth: 1,
                borderColor: color.lightgray,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 50,
                textTransform: 'capitalize',
              }}>
              {location?.length > 25 ? location.slice(0, 25) + '...' : location}
            </Text>
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

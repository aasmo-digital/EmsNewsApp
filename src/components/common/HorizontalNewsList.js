import React, {useCallback} from 'react';
import {FlatList, Pressable, Text, View, Image, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getTimeAgo} from '../../utility/functions/toast';
import HomeController from '../../screens/bottomtabs/HomeScreen/HomeController';
import color from '../../theme/color';
import MediaRenderer from './MediaRenderer';

const HorizontalNewsList = ({filteredNews, navigation, styles}) => {
  const {colors, fontFamily, sizes} = HomeController();
  // ✅ Memoized keyExtractor
  const keyExtractor = useCallback(item => item?.id?.toString(), []);

  // ✅ Memoized renderItem
  const renderItem = useCallback(
    ({item}) => (
      <Pressable
        onPress={() => navigation.navigate('NewsDetail', {news: item})}
        style={[styles.card, {backgroundColor: colors.card}]}>
        {/* <Image source={{uri: item?.media[0]?.url}} style={styles.image} /> */}

        <MediaRenderer url={item?.media[0]?.url} style={styles.image} />

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}>
          <Text
            style={[
              styles.meta,
              {
                fontSize: sizes.body,
                color: color.white,
                fontFamily: fontFamily.regular,
                opacity: 0.8,
                letterSpacing: 0.5,
              },
            ]}>
            By {item.createdBy?.name} | {getTimeAgo(item?.createdAt)}
          </Text>
          <Text
            numberOfLines={2}
            style={[
              styles.title,
              {
                fontSize: sizes.subheading,
                color: color.white,
                fontFamily: fontFamily.semiBold,
                letterSpacing: 0.5,
              },
            ]}>
            {item?.title}
          </Text>
        </LinearGradient>
      </Pressable>
    ),
    [navigation, styles],
  );

  // ✅ Agar card width fix hai (maan lo 250px)
  const getItemLayout = useCallback(
    (_, index) => ({
      length: 250,
      offset: 250 * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      data={filteredNews}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      horizontal
      getItemLayout={getItemLayout} // ⚡ Scroll fast ho jayega
      showsHorizontalScrollIndicator={false}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews={true}
      ListEmptyComponent={() => (
        <View style={{justifyContent: 'center', flex: 1, width: '100%'}}>
          <Text
            style={{
              color: colors.text,
              fontFamily: fontFamily.semiBold,
              width: Dimensions.get('window').width,
              textAlign: 'center',
              marginTop: 10,
            }}>
            No News Found.
          </Text>
        </View>
      )}
    />
  );
};

export default React.memo(HorizontalNewsList);

// import React, {useCallback, useRef, useState} from 'react';
// import {
//   FlatList,
//   Text,
//   View,
//   StyleSheet,
//   Platform,
//   Dimensions,
// } from 'react-native';
// import color from '../../../theme/color';

// import {useSelector} from 'react-redux';
// import {RootState} from '../../../services/redux/store';
// import {NewsByCategory, SingleReel} from '../../../components/componentsIndex';
// import {VideoCard} from '../../../components/cardIndex';
// import {useFontSize} from '../../../context/FontSizeContext';
// import {useTheme} from '../../../context/ThemeContext';
// import {useLanguage} from '../../../context/LanguageContext';

// export default function SessionView() {
//   const {sizes, fontFamily} = useFontSize();
//   const {colors, mode} = useTheme();
//   const {t} = useLanguage();
//   const allNeews = useSelector((state: RootState) => state.news.news);
//   const allNewsCategory = useSelector(
//     (state: RootState) => state.newsCategory.newsCategory,
//   );
//   const videos = useSelector((state: RootState) => state.videos.videos);
//   const reels = useSelector((state: RootState) => state.reels.reels);

//   console.log("reels-----------------------",reels)

//   // ✅ Memoize renderItem
//   const renderItem = useCallback(
//     ({item}: {item: any}) => (
//       <VideoCard
//         item={item}
//         style={{
//           width: Dimensions.get('screen').width / 1.3,
//           marginRight: 15,
//           height: 200,
//         }}
//       />
//     ),
//     [],
//   );

//   // ✅ Memoize keyExtractor
//   const keyExtractor = useCallback((item: any) => item?._id?.toString(), []);

//   return (
//     <View style={styles.container}>
//       {/* New By Category */}
//       <NewsByCategory allNews={allNeews} allNewsCategory={allNewsCategory} />
//       {/* Ems Videos */}
//       <>
//         <Text
//           style={[
//             {
//               fontSize: sizes.heading,
//               color: colors.text,
//               fontFamily: fontFamily.semiBold,
//               borderBottomWidth: 1,
//               borderBottomColor: colors.primary,
//               padding: 10,
//             },
//           ]}>
//           {t('ems_videos_text')}
//         </Text>
//         <FlatList
//           data={videos}
//           keyExtractor={keyExtractor}
//           renderItem={renderItem}
//           horizontal
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingBottom: 5,
//             paddingTop: 15,
//             paddingLeft: 10,
//           }}
//           initialNumToRender={6} // pehle se zyada items render → smooth scroll
//           maxToRenderPerBatch={8} // ek batch me render hone wale items
//           windowSize={10} // memory me rakhe jane wale screens
//           updateCellsBatchingPeriod={50} // batch render delay (ms)
//           removeClippedSubviews={Platform.OS === 'android'}
//           getItemLayout={(data, index) => ({
//             length: 300, // ⚡ approx height of VideoCard
//             offset: 300 * index,
//             index,
//           })}
//           showsHorizontalScrollIndicator={false}
//         />

//         {/* <Text
//           style={[
//             {
//               fontSize: sizes.heading,
//               color: colors.text,
//               fontFamily: fontFamily.semiBold,
//               borderBottomWidth: 1,
//               borderBottomColor: colors.primary,
//               padding: 10,
//             },
//           ]}>
//           {t('video_text')}
//         </Text>
//         <FlatList
//           horizontal
//           data={reels}
//           renderItem={renderItemVideo}
//           keyExtractor={item => item._id}
//           pagingEnabled
//           showsVerticalScrollIndicator={false}
//           decelerationRate="fast"
//           onViewableItemsChanged={onViewableItemsChanged}
//           viewabilityConfig={viewabilityConfig}
//           getItemLayout={(data, index) => ({
//             length: playerHeight,
//             offset: playerHeight * index,
//             index,
//           })}
//           // 🚀 Performance props
//           initialNumToRender={1} // only 2 videos at start
//           maxToRenderPerBatch={1} // reduce memory
//           windowSize={2} // only keep 1 prev + 1 next in memory
//           removeClippedSubviews // unmounts offscreen reels
//         /> */}
//       </>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     marginTop: 8,
//   },
//   categoryBtn: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   categoryBtnSelected: {
//     backgroundColor: color.white,
//     borderWidth: 0.5,
//   },

//   card: {
//     marginVertical: 10,
//     borderRadius: 10,
//     padding: 10,
//     flexDirection: 'row',
//     flex: 1,

//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 2,
//   },
//   image: {
//     height: 100,
//     width: 100,
//     borderRadius: 10,
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     padding: 10,
//   },
//   title: {
//     opacity: 0.8,
//     letterSpacing: 0.5,
//   },
// });

import React, {useCallback} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import color from '../../../theme/color';

import {useSelector} from 'react-redux';
import {RootState} from '../../../services/redux/store';
import {NewsByCategory} from '../../../components/componentsIndex';
import {VideoCard} from '../../../components/cardIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';

export default function SessionView() {
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  const allNews = useSelector((state: RootState) => state.news.news);
  const allNewsCategory = useSelector(
    (state: RootState) => state.newsCategory.newsCategory,
  );
  const videos = useSelector((state: RootState) => state.videos.videos);
  const reels = useSelector((state: RootState) => state.reels.reels);

  // ✅ Video Item
  const renderVideoItem = useCallback(
    ({item}: {item: any}) => (
      <VideoCard
        item={item}
        style={{
          width: Dimensions.get('screen').width / 1.3,
          marginRight: 15,
          height: 200,
        }}
      />
    ),
    [],
  );

  // ✅ Reels Item → Using custom ReelCard
  const renderReelItem = useCallback(
    ({item}: {item: any}) => <ReelCard item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: any) => item?._id?.toString(), []);

  return (
    <View style={styles.container}>
      {/* News By Category */}
      <NewsByCategory allNews={allNews} allNewsCategory={allNewsCategory} />

      {/* EMS Videos */}
      <Text
        style={[
          styles.sectionTitle,
          {
            fontSize: sizes.heading,
            color: colors.text,
            fontFamily: fontFamily.semiBold,
            borderBottomColor: colors.primary,
          },
        ]}>
        {t('ems_videos_text')}
      </Text>
      <FlatList
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderVideoItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 5,
          paddingTop: 15,
          paddingLeft: 10,
        }}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={Platform.OS === 'android'}
      />

      {/* Reels Section */}
      {/* <Text
        style={[
          styles.sectionTitle,
          {
            fontSize: sizes.heading,
            color: colors.text,
            fontFamily: fontFamily.semiBold,
            borderBottomColor: colors.primary,
          },
        ]}>
        {t('reels_text') || 'Reels'}
      </Text> */}
      {/* <FlatList
        data={reels}
        keyExtractor={keyExtractor}
        renderItem={renderReelItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingTop: 15,
          paddingLeft: 10,
        }}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={Platform.OS === 'android'}
      /> */}
    </View>
  );
}

/* ✅ ReelCard Component (inside same file) */
const ReelCard = ({item}: {item: any}) => {
  return (
    <View style={styles.reelCard}>
      {item?.videoUrl ? (
        <Video
          source={{uri: item.videoUrl}}
          style={styles.reelVideo}
          resizeMode="cover"
          paused={true} // 🔹 autoplay off (can control later)
          repeat
        />
      ) : (
        <Image
          source={{
            uri: item?.thumbnailUrl || 'https://via.placeholder.com/400x500',
          }}
          style={styles.reelVideo}
          resizeMode="cover"
        />
      )}

      {/* Overlay content */}
      <View style={styles.reelOverlay}>
        <Text style={styles.reelTitle} numberOfLines={1}>
          {item?.title}
        </Text>
        <Text style={styles.reelDesc} numberOfLines={2}>
          {item?.description}
        </Text>
        <View style={styles.reelFooter}>
          <Text style={styles.reelMeta}>❤️ {item?.likesCount}</Text>
          <Text style={styles.reelMeta}>💬 {item?.commentsCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  sectionTitle: {
    borderBottomWidth: 1,
    padding: 10,
  },
  reelCard: {
    width: 400,
    height: 500,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
    backgroundColor: color.white,
  },
  reelVideo: {
    width: '100%',
    height: '100%',
  },
  reelOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  reelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  reelDesc: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 2,
  },
  reelFooter: {
    flexDirection: 'row',
    marginTop: 5,
  },
  reelMeta: {
    color: '#fff',
    marginRight: 15,
    fontSize: 12,
  },
});

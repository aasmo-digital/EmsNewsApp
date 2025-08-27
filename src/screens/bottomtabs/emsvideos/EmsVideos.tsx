import React, {useEffect, useState, useCallback, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Platform,
  SafeAreaView,
} from 'react-native';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import YoutubePlayer from 'react-native-youtube-iframe';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {useLanguage} from '../../../context/LanguageContext';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../services/redux/store';
import {setVideos} from '../../../services/redux/slices/videosSlice';

// 🔹 Extract YouTube Video ID
const getYoutubeId = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// 🔹 Single Video Card (Memoized for Performance)
const VideoCard = memo(({item}: {item: any}) => {
  const videoId = getYoutubeId(item?.videoUrl);
  const {t} = useLanguage();
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.card,
        {backgroundColor: colors.card, shadowColor: colors.text},
      ]}>
      {videoId ? (
        <YoutubePlayer height={220} play={false} videoId={videoId} />
      ) : (
        <TouchableOpacity
          onPress={() => Linking.openURL(item?.videoUrl)}
          style={styles.fallbackPlayer}>
          <Text
            style={{
              color: colors.primary,
              fontSize: sizes.body,
              fontFamily: fontFamily.medium,
            }}>
            Watch on YouTube
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.infoBox}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: sizes.subheading,
              fontFamily: fontFamily.semiBold,
            },
          ]}>
          {item?.title}
        </Text>
        <Text
          style={[
            styles.meta,
            {
              fontSize: sizes.body,
              color: colors.text,
              fontFamily: fontFamily.medium,
            },
          ]}>
          {item?.category_name} • {item?.subCategory_name}
        </Text>
      </View>
    </View>
  );
});

const EmsVideos = () => {
  const [loading, setLoading] = useState(true);
  const videos = useSelector((state: RootState) => state.videos.videos);

  const [videosData, setVideosData] = useState(videos);
  const {t} = useLanguage();
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();

  const dispatch = useDispatch();

  // 🔁 API Call
  const getAllEmsVideos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllEmsVideos,
        method: 'GET',
      });

      if (response?.success) {
        setLoading(false);
        dispatch(setVideos(response?.data));
        setVideosData(response.data);
      } else {
        setLoading(false);
        setVideosData([]);
      }
    } catch (error: any) {
      setLoading(false);
      console.error('Fetch Error:', error.message);
    }
  }, []);

  useEffect(() => {
    getAllEmsVideos();
  }, [getAllEmsVideos]);

  // ✅ Memoize renderItem
  const renderItem = useCallback(
    ({item}: {item: any}) => <VideoCard item={item} />,
    [],
  );

  // ✅ Memoize keyExtractor
  const keyExtractor = useCallback((item: any) => item?._id?.toString(), []);

  return (
    <PageContainer>
      <SafeAreaView style={styles.container}>
        <HeaderCompt title="Ems Videos" />
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{flex: 1}}
          />
        ) : (
          // <FlatList
          //   data={videos}
          //   keyExtractor={(item: any) => item?._id}
          //   renderItem={({item}) => <VideoCard item={item} />}
          //   showsVerticalScrollIndicator={false}
          //   contentContainerStyle={{paddingBottom: 20}}
          //   initialNumToRender={4} // performance tweak
          //   maxToRenderPerBatch={5}
          //   windowSize={7}
          //   removeClippedSubviews={Platform.OS === 'android'}
          // />

          <FlatList
            data={videosData}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}
            // ⚡ Performance tweaks
            initialNumToRender={6} // pehle se zyada items render → smooth scroll
            maxToRenderPerBatch={8} // ek batch me render hone wale items
            windowSize={10} // memory me rakhe jane wale screens
            updateCellsBatchingPeriod={50} // batch render delay (ms)
            removeClippedSubviews={Platform.OS === 'android'}
            getItemLayout={(data, index) => ({
              length: 300, // ⚡ approx height of VideoCard
              offset: 300 * index,
              index,
            })}
          />
        )}
      </SafeAreaView>
    </PageContainer>
  );
};

export default EmsVideos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 12,
    marginBottom: 15,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  fallbackPlayer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  linkText: {},
  infoBox: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    marginTop: 4,
  },
});

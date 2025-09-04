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
import {VideoCard} from '../../../components/cardIndex';

const EmsVideos = () => {
  const [loading, setLoading] = useState(true);
  const videos = useSelector((state: RootState) => state.videos.videos);
  const {t} = useLanguage();

  const [videosData, setVideosData] = useState(videos);

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
    ({item}: {item: any}) => <VideoCard item={item} style={{}} />,
    [],
  );

  // ✅ Memoize keyExtractor
  const keyExtractor = useCallback((item: any) => item?._id?.toString(), []);

  return (
    <PageContainer>
      <SafeAreaView style={styles.container}>
        <HeaderCompt title={t('ems_videos_text')} />
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{flex: 1}}
          />
        ) : (
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
  // card: {
  //   borderRadius: 12,
  //   marginBottom: 15,
  //   shadowOpacity: 0.1,
  //   shadowOffset: {width: 0, height: 2},
  //   shadowRadius: 6,
  //   elevation: 3,
  //   overflow: 'hidden',
  // },
  // fallbackPlayer: {
  //   height: 220,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#ddd',
  // },
  // linkText: {},
  // infoBox: {
  //   padding: 12,
  // },
  // title: {
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
  // meta: {
  //   marginTop: 4,
  // },
});

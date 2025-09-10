import React, {useEffect, useState, useCallback, memo} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
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
  const {sizes, fontFamily} = useFontSize();

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

  const windowWidth = Dimensions.get('window').width;
  const isTablet = windowWidth >= 768; // 768 ya isse zyada width ko tablet maan lete hain

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
            numColumns={isTablet ? 2 : 1}
            ListEmptyComponent={
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 50,
                  color: colors.text,
                  fontFamily: fontFamily?.medium,
                  fontSize: sizes?.heading,
                }}>
                {t('no_data_found')}
              </Text>
            }
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
});

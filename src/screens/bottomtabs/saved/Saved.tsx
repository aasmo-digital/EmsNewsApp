import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {useLanguage} from '../../../context/LanguageContext';
import {NewsCard} from '../../../components/cardIndex';
import {NewsCardLoading} from '../../../components/skelotonindex';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import {useSelector} from 'react-redux';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';

const Saved = () => {
  const {t} = useLanguage();
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const renderItem = useCallback(({item}: {item: any}) => {
    return <NewsCard item={item} />;
  }, []);

  const keyExtractor = useCallback((item: any) => item?._id?.toString(), []);
  const token = useSelector(state => state?.UserData?.token);
  const [loadig, setLoading] = useState(false);
  const [allNews, setAllNews] = useState([]);

  // 🔁 getAllWishList Call
  const getAllWishList = async () => {
    setLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllWishList,
        method: 'GET',
        token: token,
      });

      if (response?.success) {
        setLoading(false);
        setAllNews(response?.data);
      } else {
        setLoading(false);
        setAllNews([]);
      }
    } catch (error: any) {
      setLoading(false);
      console.error(' Error:', error.message);
    }
  };

  useEffect(() => {
    getAllWishList();
  }, []);
  return (
    <PageContainer style={{paddingTop: 25}}>
      <View style={{flex: 1}}>
        <HeaderCompt title={t('saved_news_text')} />
        {loadig ? (
          <NewsCardLoading />
        ) : (
          <FlatList
            data={allNews}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            // ⚡ Performance props
            initialNumToRender={6} // pehle kitne render honge
            maxToRenderPerBatch={10} // ek batch me kitne items render honge
            windowSize={10} // kitne screens ka data memory me rahega
            removeClippedSubviews={true} // screen se bahar ke items remove
            updateCellsBatchingPeriod={50} // render batch delay (ms)
            getItemLayout={(data, index) => ({
              length: 100, // approx item height (optimize scrolling)
              offset: 100 * index,
              index,
            })}
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
      </View>
    </PageContainer>
  );
};

export default Saved;
const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

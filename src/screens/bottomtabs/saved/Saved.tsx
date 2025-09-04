import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback} from 'react';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {NewsCard} from '../../../components/cardIndex';
import {NewsCardLoading} from '../../../components/skelotonindex';
import {RootState} from '../../../services/redux/store';
import {useSelector} from 'react-redux';

const Saved = () => {
  const {t} = useLanguage();

  const allNeewsLoading = false;

  const allNews = useSelector((state: RootState) => state.news.news);

  // console.log(
  //   '-----------------',
  //   allNews.map(item => item?.country?.name),
  // );

  console.log;
  const renderItem = useCallback(({item}: {item: any}) => {
    return <NewsCard item={item} />;
  }, []);

  const keyExtractor = useCallback((item: any) => item?._id?.toString(), []);

  return (
    <PageContainer style={{paddingTop: 25}}>
      <View style={{flex: 1}}>
        <HeaderCompt title={t('saved_news_text')} />
        {allNeewsLoading ? (
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

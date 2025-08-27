import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {useLanguage} from '../../../context/LanguageContext';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/redux/store';
import {NewsCard} from '../../../components/cardIndex';

const RelatedNews = ({navigation, route}: any) => {
  const {t} = useLanguage();
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {categoryId} = route?.params;

  const allNeews = useSelector((state: RootState) => state.news.news);

  const allRelatedNews = allNeews.filter(
    item => item?.category?.id == categoryId?.id,
  );

  return (
    <PageContainer>
      <View style={{flex: 1}}>
        <HeaderCompt title={t('related_news_text')} />
        <FlatList
          data={allRelatedNews}
          renderItem={({item}) => <NewsCard item={item} />}
          keyExtractor={item => item?.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={() => (
            <Text
              style={{
                textAlign: 'center',
                fontFamily: fontFamily.medium,
                fontSize: sizes.subheading,
                color: colors.text,
              }}>
              No Related News Found.
            </Text>
          )}
        />
      </View>
    </PageContainer>
  );
};

export default RelatedNews;

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 10,
  },
});

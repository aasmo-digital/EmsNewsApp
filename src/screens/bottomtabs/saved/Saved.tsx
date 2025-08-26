import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {NewsCard} from '../../../components/cardIndex';
import HomeController from '../HomeScreen/HomeController';
import {NewsCardLoading} from '../../../components/skelotonindex';

const Saved = () => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  const {allNeewsLoading, allNeews} = HomeController();

  return (
    <PageContainer style={{paddingTop: 25}}>
      <View style={{flex: 1}}>
        <HeaderCompt title={t('saved_news_text')} />
        {allNeewsLoading ? (
          <NewsCardLoading />
        ) : (
          <FlatList
            data={allNeews}
            renderItem={({item}) => <NewsCard item={item} />}
            keyExtractor={item => item?._id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
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

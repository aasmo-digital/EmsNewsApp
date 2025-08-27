import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {NewsCard} from '../../../components/cardIndex';
import {ViewAllCompt} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {NewsCardLoading} from '../../../components/skelotonindex';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/redux/store';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;

const RelatedNewsSection = ({categoryId}) => {
  // console.log('-----categotyId', categoryId);
  const {t} = useLanguage();
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const allNeewsLoading = false;

  // console.log(
  //   '-------------111-----',
  //   allNeews.filter(item => item?.category?.id == categoryId),
  // );

  const allNeews = useSelector((state: RootState) => state.news.news);
  // console.log('------allNeews------', allNeews?.length);

  const allRelatedNews = allNeews.filter(
    item => item?.category?.id == categoryId?.id,
  );

  return (
    <View style={styles.container}>
      <ViewAllCompt
        title={t('related_news_text')}
        // onPress={() => navigation.navigate('RelatedNews',{categoryId:categoryId})}
      />
      {allNeewsLoading ? (
        <NewsCardLoading />
      ) : (
        <FlatList
          data={allRelatedNews.slice(0, 5)}
          renderItem={({item}) => <NewsCard item={item} />}
          keyExtractor={item => item?.id}
          showsHorizontalScrollIndicator={false}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },

  listContainer: {
    // paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 2,
  },
});

export default RelatedNewsSection;

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
import HomeController from '../../bottomtabs/HomeScreen/HomeController';
import {NewsCardLoading} from '../../../components/skelotonindex';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;

const RelatedNewsSection = ({categoryId}) => {
  // console.log('-----categotyId', categoryId);
  const {t} = useLanguage();
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();

  const {allNeewsLoading, allNeews} = HomeController();

  // console.log(
  //   '-------------111-----',
  //   allNeews.filter(item => item?.category?.id == categoryId),
  // );

  const allRelatedNews = allNeews.filter(
    item => item?.category?.id == categoryId?.id,
  );
  return (
    <View style={styles.container}>
      <ViewAllCompt
        title={t('related_news_text')}
        onPress={() => Alert.alert('Working on this.')}
      />
      {allNeewsLoading ? (
        <NewsCardLoading />
      ) : (
        <FlatList
          data={allRelatedNews}
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

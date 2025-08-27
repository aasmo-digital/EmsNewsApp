import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {NewsCardLoading} from '../../../components/skelotonindex';
import {NewsCard} from '../../../components/cardIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {RootState} from '../../../services/redux/store';
import {useSelector} from 'react-redux';

const NewsByDist = () => {
  const route = useRoute();
  const city = route?.params?.city;

  console.log('=-------cityId', city);

  const allNeewsLoading = false;

  const allNeews = useSelector((state: RootState) => state.news.news);

  const stateNews = allNeews.filter(item => item?.city?.id === city?.id);

  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

  return (
    <PageContainer style={{paddingTop: 25}}>
      <View style={{flex: 1}}>
        <HeaderCompt title={city?.name} />
        {allNeewsLoading ? (
          <NewsCardLoading />
        ) : (
          <FlatList
            data={stateNews}
            renderItem={({item}) => <NewsCard item={item} />}
            keyExtractor={item => item?._id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <Text
                style={{
                  color: colors.text,
                  fontFamily: fontFamily.medium,
                  fontSize: sizes.subheading,
                  textAlign: 'center',
                  marginTop: 200,
                }}>
                No news found.
              </Text>
            }
          />
        )}
      </View>
    </PageContainer>
  );
};

export default NewsByDist;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

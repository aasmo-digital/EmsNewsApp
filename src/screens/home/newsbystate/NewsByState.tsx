import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {NewsCardLoading} from '../../../components/skelotonindex';
import {NewsCard} from '../../../components/cardIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/redux/store';

const NewsByState = ({navigation}: any) => {
  const route = useRoute();
  const state = route?.params?.state;

  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

  const allNeewsLoading = false;

  const allNeews = useSelector((state: RootState) => state.news.news);

  const stateNews = allNeews.filter(item => item?.state?.id === state?.id);

  return (
    <PageContainer style={{paddingTop: 25}}>
      <View style={{flex: 1}}>
        <HeaderCompt title={state?.name} />
        {allNeewsLoading ? (
          <NewsCardLoading />
        ) : (
          <FlatList
            data={stateNews}
            renderItem={({item}) => (
              <NewsCard
                item={item}
                location={item?.city?.name}
                onPressLocation={() =>
                  navigation.navigate('NewsByDist', {city: item?.city})
                }
              />
            )}
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

export default NewsByState;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

import React, {useCallback, useMemo} from 'react';
import {View, Text, SectionList, StyleSheet} from 'react-native';
import {NewsCard} from '../cardIndex';
import {useNavigation} from '@react-navigation/native';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';

const NewsByCategory = ({allNews, allNewsCategory}: any) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  const navigation = useNavigation();

  const sections = useMemo(() => {
    return allNewsCategory
      .map(cat => {
        const newsForCat = allNews
          .filter(news => news.category?._id === cat._id) // match category
          .slice(0, 5); // only 5 news

        return {
          title: cat.name,
          data: newsForCat,
        };
      })
      .filter(section => section.data.length > 0); // ✅ remove empty categories
  }, [allNews, allNewsCategory]);

  const renderItem = useCallback(
    ({item}: any) => (
      <NewsCard
        item={item}
        location={item?.state?.name}
        onPressLocation={() =>
          navigation.navigate('NewsByState', {state: item?.state})
        }
      />
    ),
    [navigation],
  );

  return (
    // <SectionList
    //   sections={sections}
    //   keyExtractor={(item, index) => item._id + index}
    //   renderSectionHeader={({section}) => (
    //     <Text
    //       style={[
    //         styles.category,
    //         {
    //           fontSize: sizes.heading,
    //           color: colors.text,
    //           fontFamily: fontFamily.semiBold,
    //           borderBottomWidth: 1,
    //           borderBottomColor: colors.primary,
    //         },
    //       ]}>
    //       {section.title}
    //     </Text>
    //   )}
    //   renderItem={({item}) => (
    //     <NewsCard
    //       item={item}
    //       location={item?.state?.name}
    //       onPressLocation={() =>
    //         navigation.navigate('NewsByState', {state: item?.state})
    //       }
    //     />
    //   )}
    // />
    <SectionList
      sections={sections}
      renderSectionHeader={({section}) => (
        <Text
          style={[
            styles.category,
            {
              fontSize: sizes.heading,
              color: colors.text,
              fontFamily: fontFamily.semiBold,
              borderBottomWidth: 1,
              borderBottomColor: colors.primary,
            },
          ]}>
          {section.title}
        </Text>
      )}
      renderItem={renderItem}
      keyExtractor={(item, index) => item._id + index}
      initialNumToRender={5} // Only render 5 initially
      maxToRenderPerBatch={10} // Render in batches
      windowSize={5} // Reduce memory footprint
      removeClippedSubviews={true} // Unmount offscreen items
    />
  );
};

const styles = StyleSheet.create({
  category: {
    padding: 10,
  },
  newsItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  newsSummary: {
    fontSize: 14,
    color: '#555',
  },
});

export default NewsByCategory;

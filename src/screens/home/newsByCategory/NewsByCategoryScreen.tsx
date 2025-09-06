import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {NewsCard} from '../../../components/cardIndex';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/redux/store';

const NewsByCategoryScreen = ({route, navigation}) => {
  const {data} = route?.params;
  console.log('--------jgkllhh78527853756-------------', data);
  const allNews = useSelector((state: RootState) => state.news.news);

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
    <PageContainer>
      <View>
        <HeaderCompt title="News By Category" />

        <FlatList
          data={allNews}
          renderItem={renderItem}
          keyExtractor={(item, index) => item._id + index}
          initialNumToRender={5} // Only render 5 initially
          maxToRenderPerBatch={10} // Render in batches
          windowSize={5} // Reduce memory footprint
          removeClippedSubviews={true} // Unmount offscreen items
          contentContainerStyle={{marginHorizontal: 10}}
        />
      </View>
    </PageContainer>
  );
};

export default NewsByCategoryScreen;

const styles = StyleSheet.create({});

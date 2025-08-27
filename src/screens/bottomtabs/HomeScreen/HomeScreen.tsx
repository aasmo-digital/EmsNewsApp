import {
  View,
  Text,
  Pressable,
  Alert,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {
  HorizontalNewsList,
  Image,
  PageContainer,
  PollCompt,
} from '../../../components/componentsIndex';
import {Marquee} from '@animatereactnative/marquee';
import color from '../../../theme/color';
import SessionView from './SessionView';
import {
  CategoryLoading,
  NewsItemLoading,
} from '../../../components/skelotonindex';
import HomeController from './HomeController';
import LiveNewsCard from './LiveNewsCard';
import styles from './home.style';
import HomeHeader from './HomeHeader';

const HomeScreen = ({navigation}: any) => {
  const {
    selectedCategory,
    sizes,
    fontFamily,
    colors,
    mode,
    t,
    filteredNews,
    allCategory,
    setSelectedCategory,
    Categoryloading,
    allNeewsLoading,
    allHeadings,
    allHeadingsLoading,
    pollData,
    polldataloading,
  } = HomeController();

  console.log('-----------mode----------', mode);

  // const isVideoUrl = filteredNews.filter(
  //   item => item._id == '68aeaf4534ec0cc3f2efa232',
  // );

  const headlines = () => {
    return (
      <Marquee
        spacing={20}
        speed={1}
        style={{backgroundColor: color.appColor, marginTop: 5}}>
        <Text
          style={{
            color: color.white,
            paddingVertical: 5,
            fontSize: sizes.body,
            fontFamily: fontFamily.medium,
            letterSpacing: 0.5,
          }}>
          {allHeadings?.map(item => item?.headlineText + '   ')}
        </Text>
      </Marquee>
    );
  };

  return (
    <PageContainer style={{paddingTop: 25}}>
      <StatusBar
        barStyle={mode == 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={
          mode == 'light' ? colors.background : colors.background
        }
      />
      {/* Header  Compt */}
      <HomeHeader />
      {/* Heading List */}
      {allHeadingsLoading ? <ActivityIndicator /> : headlines()}
      {/* Category List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {Categoryloading ? (
            <CategoryLoading />
          ) : (
            <View>
              <FlatList
                data={allCategory}
                horizontal
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
                renderItem={({item}: any) => (
                  <TouchableOpacity
                    style={[
                      styles.categoryBtn,
                      {
                        backgroundColor: colors.background,
                        borderWidth: 0.2,
                        borderColor: colors.text,
                        opacity: 0.7,
                      },
                      selectedCategory === item._id && {
                        backgroundColor: colors.background,
                        borderWidth: 1,
                        borderColor: colors.text,
                      },
                    ]}
                    onPress={() => setSelectedCategory(item._id)}>
                    <Text
                      style={[
                        selectedCategory === item._id && {
                          color: colors.background,
                          fontFamily: fontFamily.semiBold,
                        },
                        {
                          color: colors.text,
                          fontFamily: fontFamily.medium,
                          fontSize: sizes.body,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* News Cards */}

          {allNeewsLoading ? (
            <NewsItemLoading />
          ) : (
            <View>
              <HorizontalNewsList
                filteredNews={filteredNews}
                // filteredNews={isVideoUrl}
                navigation={navigation}
                styles={styles}
              />
            </View>
          )}
          {/* {true && <LiveNewsCard />} */}

          {polldataloading ? (
            <ActivityIndicator />
          ) : (
            <PollCompt pollData={pollData[0]} />
          )}

          <SessionView />
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default HomeScreen;

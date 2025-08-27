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
import imageIndex from '../../../assets/imageIndex';
import LinearGradient from 'react-native-linear-gradient';
import SessionView from './SessionView';
import {
  CategoryLoading,
  NewsItemLoading,
} from '../../../components/skelotonindex';
import HomeController from './HomeController';
import {getTimeAgo} from '../../../utility/functions/toast';
import LiveNewsCard from './LiveNewsCard';
import styles from './home.style';
import {pollData} from './const';
import HomeHeader from './HomeHeader';

const HomeScreen = ({navigation}: any) => {
  const {
    selectedCategory,
    sizes,
    fontFamily,
    colors,
    t,
    filteredNews,
    allCategory,
    setSelectedCategory,
    Categoryloading,
    allNeewsLoading,
    allHeadings,
    pollData,
    polldataloading,
  } = HomeController();

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

  // const header = () => {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         paddingHorizontal: 10,
  //         justifyContent: 'space-between',
  //         alignItems: 'center',
  //       }}>
  //       <Image
  //         source={imageIndex.logo}
  //         style={{height: 80, width: 50}}
  //         resizeMode="contain"
  //       />
  //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //         <Pressable
  //           style={{marginRight: 10}}
  //           onPress={() => navigation.navigate('EPaper')}>
  //           <Text
  //             style={{
  //               paddingHorizontal: 10,
  //               borderWidth: 1,
  //               color: colors.btnbg,
  //               borderColor: colors.btnbg,
  //               fontFamily: fontFamily.medium,
  //               fontSize: sizes.body,
  //             }}>
  //             {t('epaper_text')}
  //           </Text>
  //         </Pressable>
  //         <Pressable
  //           onPress={() => navigation.navigate('EmsTv')}
  //           style={{marginRight: 10}}>
  //           <Image source={imageIndex.tv} style={{height: 30, width: 30}} />
  //         </Pressable>
  //         <Pressable
  //           onPress={() => navigation.navigate('Notification')}
  //           style={{marginRight: 10}}>
  //           <Image
  //             source={imageIndex.notification}
  //             style={{height: 25, width: 25, tintColor: colors.text}}
  //           />
  //         </Pressable>
  //         <Pressable
  //           onPress={() => navigation.navigate('EditProfile')}
  //           style={{marginRight: 10}}>
  //           <Image
  //             source={{
  //               uri: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
  //             }}
  //             style={{height: 35, width: 35, borderRadius: 50}}
  //           />
  //         </Pressable>
  //       </View>
  //     </View>
  //   );
  // };
  return (
    <PageContainer style={{paddingTop: 25}}>
      {/* {header()} */}
      <HomeHeader />

      {!Categoryloading && headlines()}

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

          {/* {headlines()} */}

          {/* News Cards */}

          {allNeewsLoading ? (
            <NewsItemLoading />
          ) : (
            <View>
              {/* <FlatList
                data={filteredNews}
                keyExtractor={item => item?.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('NewsDetail', {news: item})
                    }
                    style={[styles.card, {backgroundColor: colors.card}]}>
                    <Image
                      source={{uri: item?.media[0].url}}
                      style={styles.image}
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.8)']}
                      style={styles.gradient}>
                      <Text
                        style={[
                          styles.meta,
                          {
                            fontSize: sizes.body,
                            color: color.white,
                            fontFamily: fontFamily.regular,
                            opacity: 0.8,
                            letterSpacing: 0.5,
                          },
                        ]}>
                        By {item.createdBy?.name} |{' '}
                        {getTimeAgo(item?.createdAt)}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={[
                          styles.title,
                          {
                            fontSize: sizes.subheading,
                            color: color.white,
                            fontFamily: fontFamily.semiBold,
                            letterSpacing: 0.5,
                          },
                        ]}>
                        {item?.title}
                      </Text>
                    </LinearGradient>
                  </Pressable>
                )}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        color: colors.text,
                        fontFamily: fontFamily.semiBold,
                        width: Dimensions.get('window').width,
                        textAlign: 'center',
                        marginTop: 10,
                      }}>
                      No News Found.
                    </Text>
                  </View>
                )}
              /> */}

              <HorizontalNewsList
                filteredNews={filteredNews}
                // filteredNews={isVideoUrl}
                navigation={navigation}
                styles={styles}
              />
            </View>
          )}
          {true && <LiveNewsCard />}
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

import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  HeaderCompt,
  PageContainer,
  SearchBarCompt,
  ViewAllCompt,
} from '../../../components/componentsIndex';
import color from '../../../theme/color';
import {categories, newsData} from '../HomeScreen/const';
import {getTimeAgo} from '../../../utility/functions/toast';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import HomeController from '../HomeScreen/HomeController';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import TagsModal from './TagsModal';
import {NewsCardLoading} from '../../../components/skelotonindex';
import styles from './style.explore';

const Explore = ({navigation}) => {
  const {allNeewsLoading, allNeews} = HomeController();

  const {t} = useLanguage();

  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();

  const [query, setQuery] = useState('');

  const filteredData = allNeews.filter(item =>
    item?.title?.toLowerCase()?.includes(query.toLowerCase()),
  );

  console.log('------', filteredData.length);

  const [newsTagsloading, setnewsTagsLoading] = useState(false);
  const [allnewsTags, setAllnewsTags] = useState([]);

  const newsTags = [
    'Breaking News',
    'Politics',
    'Sports',
    'Entertainment',
    'Technology',
    'Business',
    'Health',
    'Science',
    'Travel',
    'World',
  ];

  // 🔁 getAllnewsTags Call
  const getAllnewsTags = async () => {
    setnewsTagsLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.newCategory,
        method: 'GET',
      });
      if (response) {
        setnewsTagsLoading(false);
        setAllnewsTags(newsTags);
      } else {
        setnewsTagsLoading(false);
      }
    } catch (error: any) {
      setnewsTagsLoading(false);
      console.error(' Error:', error.message);
    }
  };
  useEffect(() => {
    getAllnewsTags();
  }, []);

  // बॉटम शीट के लिए एक ref बनाएँ
  const bottomSheetModalRef = useRef(null);

  // बॉटम शीट को खोलने के लिए एक फ़ंक्शन
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <PageContainer style={{paddingTop: 25}}>
      {/* newsTags List */}
      {/* <HeaderCompt showBackButton={true} title={'Explore News'} /> */}
      <SearchBarCompt value={query} onChangeText={setQuery} />
      <BottomSheetModalProvider>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ViewAllCompt
            title={t('popular_tags_text')}
            onPress={handlePresentModalPress}
            style={{marginHorizontal: 10}}
          />

          <View style={styles.scroll}>
            {allnewsTags
              .map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tagContainer,
                    {backgroundColor: colors.card, shadowColor: colors.text},
                  ]}>
                  <Text
                    style={{
                      color: colors.text,
                      fontFamily: fontFamily.medium,
                      fontSize: sizes.body,
                    }}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))
              .slice(0, 3)}
          </View>

          {allNeewsLoading ? (
            <NewsCardLoading />
          ) : (
            <View>
              <FlatList
                data={filteredData}
                keyExtractor={(item: any) => item?._id}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}: any) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('NewsDetail', {news: item})
                    }
                    style={[styles.card, {backgroundColor: colors.card}]}>
                    <Image
                      source={{uri: item?.media[0].url}}
                      style={styles.image}
                    />
                    <View style={styles.gradient}>
                      <Text
                        style={[
                          styles.city,
                          {
                            color: colors.text,
                            fontFamily: fontFamily.medium,
                            fontSize: sizes.body,
                          },
                        ]}>
                        {item?.city?.name}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={[
                          styles.title,
                          {
                            color: colors.text,
                            fontFamily: fontFamily.semiBold,
                            fontSize: sizes.subheading,
                          },
                        ]}>
                        {item?.title}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={[
                            styles.meta,
                            {
                              color: colors.text,
                              fontFamily: fontFamily.regular,
                              fontSize: sizes.body,
                            },
                          ]}>
                          {getTimeAgo(item?.createdAt)} |
                        </Text>
                        <Image
                          style={{
                            height: 20,
                            width: 20,
                            borderRadius: 20,
                            marginHorizontal: 10,
                          }}
                          source={{uri: item?.createdBy?.profileImage}}
                        />
                        <Text
                          style={[
                            styles.meta,
                            {
                              color: colors.text,
                              fontFamily: fontFamily.regular,
                              fontSize: sizes.body,
                            },
                          ]}>
                          By {item?.createdBy?.name}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                )}
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

              <TagsModal ref={bottomSheetModalRef} />
            </View>
          )}
        </ScrollView>
      </BottomSheetModalProvider>
    </PageContainer>
  );
};

export default Explore;

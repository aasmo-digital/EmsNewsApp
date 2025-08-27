import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import React from 'react';
import {
  CustomSlider,
  HeaderCompt,
  LikeCompt,
  PageContainer,
} from '../../../components/componentsIndex';
import {Marquee} from '@animatereactnative/marquee';
import color from '../../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure you have this library
import LiveUpdatesSection from './LiveUpdatesSection';
import RelatedNewsSection from './RelatedNewsSection';
import {useLanguage} from '../../../context/LanguageContext';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useRoute} from '@react-navigation/native';
import HomeController from '../../bottomtabs/HomeScreen/HomeController';
const {width} = Dimensions.get('window');

const NewsDetailScreen = ({navigation}: any) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

  const route = useRoute();
  const newsData = route?.params?.news;

  // console.log('--->>>--', newsData);

  const {allHeadings} = HomeController();

  const Headlines = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: color.appColor,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        {/* Left: Static "Headlines" box */}
        <View
          style={{
            backgroundColor: color.warning,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 5,
            zIndex: 2, // ensures it stays above
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: fontFamily.semiBold,
              letterSpacing: 0.5,
              fontSize: sizes.body,
            }}>
            {t('headlines_text')}
          </Text>
        </View>

        {/* Right: Scrolling Marquee */}
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            backgroundColor: color.appColor, // ensures full solid background
            overflow: 'hidden',
          }}>
          <Marquee speed={1} style={{paddingVertical: 5}}>
            <Text
              style={{
                color: 'white',
                fontFamily: fontFamily.medium,
                fontSize: sizes.subheading,
              }}>
              {allHeadings.map(item => item?.headlineText + '   ')}
            </Text>
          </Marquee>
        </View>
      </View>
    );
  };

  const handleShareNews = async news => {
    try {
      const shareContent = `
${news.title}

${news.summary?.slice(0, 150)}...

Read more: https://yourapp.com/news/${news.id}
    `.trim();

      await Share.share({
        message: shareContent,
        url: news.media?.[0]?.url || '', // Optional image link
        title: news.title,
      });
    } catch (error) {
      console.log('Error sharing news:', error);
    }
  };

  return (
    <PageContainer scroll style={{paddingTop: 25}}>
      <HeaderCompt title={t('news_details_text')} />
      {Headlines()}
      <View>
        <CustomSlider
          images={newsData?.media}
          sliderHeight={300}
          dotColor="#ff6347"
          inactiveDotColor="#ccc"
          autoplay={true}
          delay={4000}
        />
      </View>

      <View style={styles.interactionBar}>
        {/* <View style={styles.interactionItem}>
          <Icon name="heart-o" size={20} color={colors.text} />
          <Text
            style={[
              styles.interactionText,
              {
                fontSize: sizes.body,
                color: colors.text,
                fontFamily: fontFamily.regular,
              },
            ]}>
            {article.likes}
          </Text>
        </View> */}

        <LikeCompt item={newsData} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Comments', {comments: newsData?.comments})
          }
          style={styles.interactionItem}>
          <Icon name="comment-o" size={20} color={colors.text} />
          <Text
            style={[
              styles.interactionText,
              {
                fontSize: sizes.body,
                color: colors.text,
                fontFamily: fontFamily.regular,
              },
            ]}>
            {newsData?.commentsCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleShareNews(newsData)}
          style={styles.interactionItem}>
          <Icon name="share" size={20} color={colors.text} />
        </TouchableOpacity>

        {/* <View style={styles.interactionItem}>
          <Icon name="bookmark-o" size={20} color={colors.text} />
          <Text
            style={[
              styles.interactionText,
              {
                fontSize: sizes.body,
                color: colors.text,
                fontFamily: fontFamily.regular,
              },
            ]}>
        {article.bookmarks}
          </Text>
        </View> */}
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.title,
            {
              fontSize: sizes.subheading,
              color: colors.text,
              fontFamily: fontFamily.semiBold,
            },
          ]}>
          {newsData?.title}
        </Text>

        {/* Author Bar */}
        <View style={styles.authorBar}>
          <Text
            style={{
              color: colors.primary, // Red color for category
              fontSize: sizes.body,
              fontFamily: fontFamily.semiBold,
              letterSpacing: 0.5,
            }}>
            {newsData?.category?.name}
          </Text>
          <View style={styles.authorInfo}>
            {/* <Text
              style={{fontSize: sizes.body, color: colors.text, opacity: 0.8}}>
              
            </Text> */}
            <Image
              style={{height: 25, width: 25, borderRadius: 50, marginRight: 5}}
              source={{uri: newsData?.createdBy?.profileImage}}
            />
            <Text
              style={{
                fontSize: sizes.body,
                color: colors.text,
                fontFamily: fontFamily.medium,
                opacity: 0.5,
                textTransform: 'capitalize',
              }}>
              By {newsData?.createdBy?.name}
            </Text>
          </View>
        </View>

        {/* Article Body */}
        <Text
          style={{
            fontSize: sizes.body,
            color: colors.text,
            fontFamily: fontFamily.regular,
            letterSpacing: 0.5,
          }}>
          {newsData?.content}
        </Text>

        <Text
          style={{
            fontSize: sizes.body,
            color: colors.text,
            fontFamily: fontFamily.regular,
            letterSpacing: 0.5,
            marginTop: 20,
          }}>
          {newsData?.summary}
        </Text>
        {/* <LiveUpdatesSection /> */}
        <RelatedNewsSection categoryId={newsData?.category}   />
      </View>
    </PageContainer>
  );
};

export default NewsDetailScreen;

const styles = StyleSheet.create({
  interactionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  interactionText: {
    marginLeft: 6,
    letterSpacing: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  authorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {
  CustomSlider,
  HeaderCompt,
  LikeCompt,
  PageContainer,
} from '../../../components/componentsIndex';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure you have this library
import RelatedNewsSection from './RelatedNewsSection';
import {useLanguage} from '../../../context/LanguageContext';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useRoute} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';

const NewsDetailScreen = ({navigation}: any) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

  const route = useRoute();
  const newsData = route?.params?.news;

  const {width} = useWindowDimensions();

  function isHtml(content: any) {
    if (!content || typeof content !== 'string') {
      return false;
    }
    const pattern = /<[^>]+>/g;
    return pattern.test(content);
  }

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
      {/* {Headlines()} */}
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

        {isHtml(newsData.content) ? (
          <RenderHtml
            contentWidth={width}
            source={{html: newsData.content}}
            tagsStyles={{
              body: {
                color: colors.text, // 👈 aapke theme ka text color
                backgroundColor: colors.background, // 👈 bg white hatao
                fontFamily: fontFamily.regular,
                fontSize: sizes.body,
                lineHeight: sizes.body * 1.5,
              },
              p: {
                marginBottom: 8,
                backgroundColor: colors.background,
              },
              strong: {
                fontFamily: fontFamily.regular,
                backgroundColor: colors.background,
              },
              span: {
                color: colors.text,
                backgroundColor: colors.background,
              },
            }}
            baseStyle={{
              color: colors.text, // ✅ sab par default text color apply
              backgroundColor: colors.background, // ✅ white background remove
            }}
          />
        ) : (
          <Text
            style={{
              fontSize: sizes.body,
              color: colors.text,
              fontFamily: fontFamily.regular,
              letterSpacing: 0.5,
            }}>
            {newsData.content}
          </Text>
        )}

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
        <RelatedNewsSection categoryId={newsData?.category} />
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

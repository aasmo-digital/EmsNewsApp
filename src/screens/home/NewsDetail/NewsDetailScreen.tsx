import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  CustomSlider,
  HeaderCompt,
  PageContainer,
} from '../../../components/componentsIndex';
import {Marquee} from '@animatereactnative/marquee';
import color from '../../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure you have this library
import LiveUpdatesSection from './LiveUpdatesSection';
import RelatedNewsSection from './RelatedNewsSection';
const {width} = Dimensions.get('window');

const NewsDetailScreen = ({navigation}) => {
  const article = {
    title: '15 दिनों में एक हजार से ज्यादा भूकंप, नींद में भी लगता है डर',
    category: 'News Cat.',
    author: 'Aman Sanodiya',
    authorImage: 'https://i.pravatar.cc/150?u=aman', // Placeholder author image
    imageUrl:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070',
    imageUrls: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070',
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2070',
    ], // Placeholder article image
    likes: 800,
    comments: 201,
    bookmarks: 122,
    body: `July 5 Japan Manga Warning: जापान में पिछले दो हफ्तों में 1000 से ज्यादा भूकंप आ चुके हैं, जिससे लोगों में डर का माहौल है. इस बीच, एक मंगा कॉमिक बुक ने और भी दहशत फैला दी है, जिसमें 5 जुलाई यानी आज के दिन को कयामत का दिन बताया गया है. कॉमिक बुक की इस भविष्यवाणी को लेकर सोशल मीडिया पर अफवाहें फैल गई हैं. कॉमिक बुक की इस भविष्यवाणी से लोग हैरान हैं.\n\nकई लोगों का मानना है कि जापान में कोई बड़ी आपदा आने वाली है. डेटा के अंदर ही नहीं, दुनिया भर के लोग भी जापान आने के प्लान को लेकर डर में हैं. टूरिज्म में गिरावट देखी जा रही है क्योंकि लोग 5 जुलाई को लेकर खौफ में हैं.\n\nजापान में रहने वाले लोग भी सोच में पड़ गए हैं कि आगे क्या होगा. हालांकि, अभी तक किसी भी आधिकारिक एजेंसी ने कॉमिक बुक की भविष्यवाणी को गंभीर नहीं माना है, लेकिन लोगों में चिंता बनी हुई है.`,
  };

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
          <Text style={{color: 'white', fontWeight: 'bold'}}>Headlines</Text>
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
            <Text style={{color: 'white'}}>
              20 साल बाद ठाकरे परिवार एक साथ: उद्धव बोले- मराठी ने दूरियां खत्म
              कीं 20 साल बाद ठाकरे परिवार एक साथ: उद्धव बोले- मराठी ने दूरियां
              खत्म कीं
            </Text>
          </Marquee>
        </View>
      </View>
    );
  };
  return (
    <PageContainer scroll>
      <HeaderCompt title="News Details" />
      {Headlines()}
      <View>
        <CustomSlider
          images={article?.imageUrls}
          sliderHeight={300}
          dotColor="#ff6347"
          inactiveDotColor="#ccc"
          autoplay={true}
          delay={4000}
        />
      </View>

      <View style={styles.interactionBar}>
        <View style={styles.interactionItem}>
          <Icon name="heart-o" size={20} color="#555" />
          <Text style={styles.interactionText}>{article.likes}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Comments')}
          style={styles.interactionItem}>
          <Icon name="comment-o" size={20} color="#555" />
          <Text style={styles.interactionText}>{article.comments}</Text>
        </TouchableOpacity>
        <View style={styles.interactionItem}>
          <Icon name="bookmark-o" size={20} color="#555" />
          <Text style={styles.interactionText}>{article.bookmarks}</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{article.title}</Text>

        {/* Author Bar */}
        <View style={styles.authorBar}>
          <Text style={styles.categoryText}>{article.category}</Text>
          <View style={styles.authorInfo}>
            <Text style={styles.byText}>By </Text>
            <Text style={styles.authorName}>{article.author}</Text>
          </View>
        </View>

        {/* Article Body */}
        <Text style={styles.bodyText}>{article.body}</Text>
        <LiveUpdatesSection />
        <RelatedNewsSection />
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
    fontSize: 14,
    color: '#555',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 12,
    lineHeight: 30,
  },
  authorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryText: {
    color: '#e53935', // Red color for category
    fontWeight: 'bold',
    fontSize: 14,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  byText: {
    fontSize: 14,
    color: '#555',
  },
  authorName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
  },
});

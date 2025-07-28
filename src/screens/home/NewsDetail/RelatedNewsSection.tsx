import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {NewsCard} from '../../../components/cardIndex';

// --- स्टेप 1: डेटा का स्ट्रक्चर (यह आपके API से आएगा) ---
const mockRelatedNews = [
  {
    id: '1',
    title: 'ग्राइंड रिपोर्ट: धर्म जानने के लिए होटल कर्मचारियों...',
    category: 'भारत',
    time: '4min ago',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?w=500',
    description: `In a major announcement today, the Prime Minister unveiled a new agricultural scheme designed to double the income of farmers by 2027. The scheme will focus on direct subsidy transfers, smart irrigation, access to premium seeds, and AI-driven crop advisory services.`,
  },
  {
    id: '2',
    title: 'Tokyo Paralympics: Avani Lekhara wins gold',
    category: 'BBC Sport',
    time: '1h ago',
    imageUrl:
      'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=500',
    description: `In a major announcement today, the Prime Minister unveiled a new agricultural scheme designed to double the income of farmers by 2027. The scheme will focus on direct subsidy transfers, smart irrigation, access to premium seeds, and AI-driven crop advisory services.`,
  },
  {
    id: '3',
    title: 'नया ग्राफिक कार्ड हुआ लॉन्च, जानें कीमत और फीचर्स',
    category: 'टेक न्यूज़',
    time: '3h ago',
    imageUrl:
      'https://images.unsplash.com/photo-1591444691157-12497d31a700?w=500',
    description: `In a major announcement today, the Prime Minister unveiled a new agricultural scheme designed to double the income of farmers by 2027. The scheme will focus on direct subsidy transfers, smart irrigation, access to premium seeds, and AI-driven crop advisory services.`,
  },
];

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;

const RelatedNewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setNews(mockRelatedNews);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="small"
        color="#B81F24"
        style={{marginVertical: 20}}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recommendation Topic</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={news}
        renderItem={({item}) => <NewsCard item={item} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#B81F24',
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

export default RelatedNewsSection;

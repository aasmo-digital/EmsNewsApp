import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // आइकॉन के लिए

// --- स्टेप 1: डेटा का स्ट्रक्चर (यह आपके API से आएगा) ---
const mockLiveUpdates = [
  {
    id: '1',
    title: 'US jobs growth disappoints as recovery falters',
    source: 'EMS NEWS',
    time: '1min ago',
    content:
      'Shehbaz Sharif on Pahalgam Terror Attack: पाकिस्तान के प्रधानमंत्री शहबाज शरीफ ने भारत पर आरोप लगाया कि वह...',
    icon: 'refresh-ccw', // Feather icons से
  },
  {
    id: '2',
    title: 'यह बात शहबाज शरीफ ने मध्य एशियाई सहयोग संगठन में कही',
    source: null,
    time: '5min ago',
    content:
      'यह बात शहबाज शरीफ ने मध्य एशियाई सहयोग संगठन (ECO) सम्मेलन में कही. यह सम्मेलन उन देशों का समूह है, जिनमें से कुछ ने हाल ही में ऑपरेशन...',
    icon: null,
  },
  {
    id: '3',
    title: 'अब फटेगा कुर्ता! मैं लैला लैला चिल्लाऊंगा गाने पर...',
    source: 'Local News',
    time: '12min ago',
    content: 'साथ डांस कर रहा था पति, तभी स्टेज पर...',
    icon: 'link-2', // Feather icons से
  },
];

// --- स्टेप 2: प्रत्येक अपडेट आइटम को रेंडर करने वाला कंपोनेंट ---
const UpdateItem = ({item, isLastItem}: any) => {
  return (
    <View style={styles.updateItemContainer}>
      {/* टाइमलाइन (डॉट और लाइन) */}
      <View style={styles.timelineContainer}>
        <View style={styles.dot} />
        {/* आखिरी आइटम के लिए लाइन न दिखाएं */}
        {!isLastItem && <View style={styles.line} />}
      </View>

      {/* कंटेंट */}
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.updateTitle}>{item.title}</Text>
          {item.icon && <Icon name="sync" size={18} color="#D32F2F" />}
        </View>

        {(item.source || item.time) && (
          <Text style={styles.metaText}>
            {item.source && (
              <Text style={styles.sourceText}>{item.source}</Text>
            )}
            {item.source && item.time && ' • '}
            {item.time && <Text>{item.time}</Text>}
          </Text>
        )}

        <Text style={styles.contentText}>{item.content}</Text>
      </View>
    </View>
  );
};

// --- स्टेप 3: मुख्य लाइव अपडेट सेक्शन कंपोनेंट ---
const LiveUpdatesSection = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  // API से डेटा लाने का सिमुलेशन
  useEffect(() => {
    // यहाँ आप अपना API कॉल करेंगे
    setTimeout(() => {
      setUpdates(mockLiveUpdates);
      setLoading(false);
    }, 1500); // 1.5 सेकंड का नकली डिले
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#B81F24"
        style={{marginVertical: 20}}
      />
    );
  }

  // FlatList के लिए renderItem फंक्शन
  const renderUpdateItem = ({item, index}) => (
    <UpdateItem item={item} isLastItem={index === updates.length - 1} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>लाइव अपडेट्स</Text>
      <FlatList
        data={updates}
        renderItem={renderUpdateItem}
        keyExtractor={item => item.id}
        // अगर यह सेक्शन ScrollView के अंदर है, तो स्क्रॉलिंग को डिसेबल करें
        scrollEnabled={false}
        // लिस्ट के आइटम्स के बीच थोड़ी जगह के लिए
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
    </View>
  );
};

// --- स्टेप 4: स्टाइल्स ---
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 24,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 16,
  },
  updateItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineContainer: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3498db', // नीला डॉट
    zIndex: 1, // लाइन के ऊपर रखने के लिए
  },
  line: {
    position: 'absolute',
    top: 6, // डॉट के सेंटर से शुरू करने के लिए
    bottom: -10, // अगले आइटम तक पहुंचने के लिए (ItemSeparatorComponent की हाइट को कवर करने के लिए)
    width: 2,
    backgroundColor: '#e0e0e0',
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // ताकि टेक्स्ट रैप हो सके
  },
  metaText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  sourceText: {
    fontWeight: 'bold',
    color: '#555',
  },
  contentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 21,
  },
});

export default LiveUpdatesSection;

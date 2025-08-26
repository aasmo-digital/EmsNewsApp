// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // आइकॉन के लिए
// import {useFontSize} from '../../../context/FontSizeContext';
// import {useTheme} from '../../../context/ThemeContext';
// import {useLanguage} from '../../../context/LanguageContext';
// import ApiRequest from '../../../services/api/ApiRequest';
// import ApiRoutes from '../../../services/config/ApiRoutes';

// const mockLiveUpdates = [
//   {
//     id: '1',
//     title: 'US jobs growth disappoints as recovery falters',
//     source: 'EMS NEWS',
//     time: '1min ago',
//     content:
//       'Shehbaz Sharif on Pahalgam Terror Attack: पाकिस्तान के प्रधानमंत्री शहबाज शरीफ ने भारत पर आरोप लगाया कि वह...',
//     icon: 'refresh-ccw', // Feather icons से
//   },
//   {
//     id: '2',
//     title: 'यह बात शहबाज शरीफ ने मध्य एशियाई सहयोग संगठन में कही',
//     source: null,
//     time: '5min ago',
//     content:
//       'यह बात शहबाज शरीफ ने मध्य एशियाई सहयोग संगठन (ECO) सम्मेलन में कही. यह सम्मेलन उन देशों का समूह है, जिनमें से कुछ ने हाल ही में ऑपरेशन...',
//     icon: null,
//   },
//   {
//     id: '3',
//     title: 'अब फटेगा कुर्ता! मैं लैला लैला चिल्लाऊंगा गाने पर...',
//     source: 'Local News',
//     time: '12min ago',
//     content: 'साथ डांस कर रहा था पति, तभी स्टेज पर...',
//     icon: 'link-2', // Feather icons से
//   },
// ];

// const UpdateItem = ({item, isLastItem}: any) => {
//   return (
//     <View style={styles.updateItemContainer}>
//       <View style={styles.timelineContainer}>
//         <View style={styles.dot} />
//         {!isLastItem && <View style={styles.line} />}
//       </View>

//       <View style={styles.contentContainer}>
//         <View style={styles.titleRow}>
//           <Text style={styles.updateTitle}>{item.title}</Text>
//           {item.icon && <Icon name="sync" size={18} color="#D32F2F" />}
//         </View>

//         {(item.source || item.time) && (
//           <Text style={styles.metaText}>
//             {item.source && (
//               <Text style={styles.sourceText}>{item.source}</Text>
//             )}
//             {item.source && item.time && ' • '}
//             {item.time && <Text>{item.time}</Text>}
//           </Text>
//         )}

//         <Text style={styles.contentText}>{item.content}</Text>
//       </View>
//     </View>
//   );
// };

// const LiveUpdatesSection = () => {
//   const {sizes, fontFamily} = useFontSize();
//   const {colors, mode} = useTheme();
//   const {t} = useLanguage();
//   const [updates, setUpdates] = useState([]);

//   const [updatesloading, setupdatesLoading] = useState(false);

//   // 🔁 getupdates Call
//   const getupdates = async () => {
//     setupdatesLoading(true);
//     try {
//       const response = await ApiRequest({
//         BaseUrl: ApiRoutes.newCategory,
//         method: 'GET',
//       });
//       if (response) {
//         setupdatesLoading(false);
//         setUpdates(mockLiveUpdates);
//       } else {
//         setupdatesLoading(false);
//       }
//     } catch (error: any) {
//       setupdatesLoading(false);
//       console.error(' Error:', error.message);
//     }
//   };

//   useEffect(() => {
//     getupdates();
//   }, []);

//   if (updatesloading) {
//     return (
//       <ActivityIndicator
//         size="large"
//         color={colors.primary}
//         style={{marginVertical: 20}}
//       />
//     );
//   }

//   const renderUpdateItem = ({item, index}: any) => (
//     <UpdateItem item={item} isLastItem={index === updates.length - 1} />
//   );

//   return (
//     <View style={styles.container}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             fontSize: sizes.subheading,
//             fontFamily: fontFamily.semiBold,
//             color: colors.text,
//           },
//         ]}>
//         {t('live_updates_text')}
//       </Text>
//       <FlatList
//         data={updates}
//         renderItem={renderUpdateItem}
//         keyExtractor={item => item?.id}
//         scrollEnabled={false}
//         ItemSeparatorComponent={() => <View style={{height: 10}} />}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//     marginTop: 24,
//     paddingBottom: 20,
//   },
//   sectionTitle: {
//     marginBottom: 16,
//     letterSpacing: 0.5,
//   },
//   updateItemContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   timelineContainer: {
//     width: 20,
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   dot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#3498db',
//     zIndex: 1,
//   },
//   line: {
//     position: 'absolute',
//     top: 6,
//     bottom: -10,
//     width: 2,
//     backgroundColor: '#e0e0e0',
//   },
//   contentContainer: {
//     flex: 1,
//   },
//   titleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   updateTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     flex: 1,
//   },
//   metaText: {
//     fontSize: 12,
//     color: '#888',
//     marginBottom: 8,
//   },
//   sourceText: {
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   contentText: {
//     fontSize: 14,
//     color: '#555',
//     lineHeight: 21,
//   },
// });

// export default LiveUpdatesSection;

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
// Mock data for demonstration
const dummyDataBank = [
  {
    id: '1',
    title: 'अमेरिका में नौकरियों के आंकड़े निराशाजनक, सुधार की गति धीमी',
    source: 'EMS NEWS',
    time: 'अब से 1 मिनट पहले',
    content:
      'शहबाज शरीफ का पहलगाम आतंकी हमले पर बयान: पाकिस्तान के प्रधानमंत्री ने भारत पर आरोप लगाया कि वह...',
  },
  {
    id: '2',
    title: 'यह बात शहबाज शरीफ ने मध्य एशियाई सहयोग संगठन में कही',
    source: null,
    time: '5 मिनट पहले',
    content:
      'यह सम्मेलन उन देशों का समूह है, जिनमें से कुछ ने हाल ही में ऑपरेशन किए हैं...',
  },
  {
    id: '3',
    title: 'लाइव कॉन्सर्ट में डांसर के साथ नाचे निरहुआ, वीडियो हुआ वायरल',
    source: 'मनोरंजन ब्यूरो',
    time: '12 मिनट पहले',
    content:
      'भोजपुरी सुपरस्टार दिनेश लाल यादव "निरहुआ" का एक वीडियो सोशल मीडिया पर तेजी से वायरल हो रहा है।',
  },
  {
    id: '4',
    title: 'बाजार में भारी गिरावट, सेंसेक्स 500 अंक टूटा',
    source: 'बिजनेस डेस्क',
    time: '30 मिनट पहले',
    content:
      'कमजोर वैश्विक संकेतों के चलते भारतीय शेयर बाजार में आज भारी बिकवाली देखने को मिली।',
  },

  {
    id: '1',
    title: 'अमेरिका में नौकरियों के आंकड़े निराशाजनक, सुधार की गति धीमी',
    source: 'EMS NEWS',
    time: 'अब से 1 मिनट पहले',
    content:
      'शहबाज शरीफ का पहलगाम आतंकी हमले पर बयान: पाकिस्तान के प्रधानमंत्री ने भारत पर आरोप लगाया कि वह...',
  },
  {
    id: '2',
    title: 'यह बात शहबाज शरीफ ने मध्य एशियाई सहयोग संगठन में कही',
    source: null,
    time: '5 मिनट पहले',
    content:
      'यह सम्मेलन उन देशों का समूह है, जिनमें से कुछ ने हाल ही में ऑपरेशन किए हैं...',
  },
];

// Single Update Item Component
const UpdateItem = ({item, isLastItem}: {item: any; isLastItem: boolean}) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();

  return (
    <View style={styles.updateItemContainer}>
      {/* ========== बाईं ओर की टाइमलाइन ========== */}
      <View style={styles.timelineColumn}>
        <Text
          style={[
            styles.timeText,
            {color: colors.primary, fontFamily: fontFamily.bold},
          ]}>
          {item.time}
        </Text>
        <View style={styles.markerContainer}>
          <View style={[styles.iconCircle, {backgroundColor: colors.primary}]}>
            <Icon name="schedule" size={14} color="#FFFFFF" />
          </View>
          {/* वर्टिकल लाइन जो अंतिम आइटम के लिए नहीं दिखेगी */}
          {!isLastItem && (
            <View style={[styles.line, {backgroundColor: colors.border}]} />
          )}
        </View>
      </View>

      {/* ========== दाईं ओर का कंटेंट ========== */}
      <View style={[styles.contentColumn, {borderLeftColor: colors.text}]}>
        <Text
          style={[
            styles.updateTitle,
            {
              color: colors.text,
              fontFamily: fontFamily.semiBold,
              fontSize: sizes.subheading,
            },
          ]}>
          {item.title}
        </Text>
        {item.source && (
          <Text
            style={[
              styles.sourceText,
              {
                color: colors.text,
                fontFamily: fontFamily.regular,
                fontSize: sizes.body,
              },
            ]}>
            {item.source}
          </Text>
        )}
        <Text
          style={[
            styles.contentText,
            {
              color: colors.text,
              fontFamily: fontFamily.regular,
              fontSize: sizes.body,
              lineHeight: sizes.body * 1.6,
            },
          ]}>
          {item.content}
        </Text>
      </View>
    </View>
  );
};

// मुख्य सेक्शन कंपोनेंट नए लॉजिक के साथ
const LiveUpdatesSection = () => {
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  const [updates, setUpdates] = useState<any[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  // useRef का उपयोग अगले आइटम के इंडेक्स को ट्रैक करने के लिए
  const currentIndexRef = useRef(0);
  // useRef का उपयोग इंटरवल आईडी को स्टोर करने के लिए ताकि उसे साफ किया जा सके
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. शुरुआती 5-सेकंड का लोडर
    const initialLoadTimeout = setTimeout(() => {
      setInitialLoading(false); // मुख्य लोडर को बंद करें

      // 2. बाकी आइटम्स को एक-एक करके जोड़ने के लिए इंटरवल शुरू करें
      intervalRef.current = setInterval(() => {
        // जांचें कि क्या dummyDataBank में और आइटम्स हैं
        if (currentIndexRef.current < dummyDataBank.length) {
          const nextItem = dummyDataBank[currentIndexRef.current];
          // नया आइटम हमेशा लिस्ट के टॉप पर जोड़ें
          setUpdates(prevUpdates => [nextItem, ...prevUpdates]);
          // अगले आइटम के लिए इंडेक्स बढ़ाएं
          currentIndexRef.current++;
        } else {
          // अगर सभी आइटम्स जुड़ गए हैं, तो इंटरवल को रोक दें
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      }, 3000); // हर 3 सेकंड में एक नया आइटम जोड़ें
    }, 5000); // 5 सेकंड का शुरुआती इंतजार

    // 3. Cleanup Function: जब कंपोनेंट अनमाउंट हो, तो टाइमर और इंटरवल को साफ करें
    return () => {
      clearTimeout(initialLoadTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // खाली डिपेंडेंसी ऐरे [] का मतलब है कि यह useEffect सिर्फ एक बार चलेगा

  // शुरुआती लोडर के लिए UI
  if (initialLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, {color: colors.text}]}>
          लाइव अपडेट्स लोड हो रहे हैं...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
            fontSize: sizes.heading,
            fontFamily: fontFamily.bold,
          },
        ]}>
        {t('live_updates_text')}
      </Text>
      <FlatList
        data={updates}
        renderItem={({item, index}) => (
          // अब आखिरी आइटम वह है जो 'updates' ऐरे में सबसे अंत में है
          <UpdateItem item={item} isLastItem={index === updates.length - 1} />
        )}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        // जब भी नया आइटम जुड़े तो एक अच्छा सा एनिमेशन दिखाने के लिए
        inverted // नए आइटम्स को टॉप पर रखने में मदद करता है
        ListFooterComponent={() =>
          !initialLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={[styles.loadingText, {color: colors.text}]}>
                लाइव अपडेट्स लोड हो रहे हैं...
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  loaderContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  sectionTitle: {
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  updateItemContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineColumn: {
    width: 90,
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  markerContainer: {
    position: 'relative',
    alignItems: 'center',
    marginLeft: 4,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  line: {
    position: 'absolute',
    top: 12,
    bottom: -32,
    width: 2,
  },
  contentColumn: {
    flex: 1,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#EEEEEE',
    paddingBottom: 16,
  },
  updateTitle: {fontWeight: '600', marginBottom: 4},
  sourceText: {marginBottom: 8, fontStyle: 'italic'},
  contentText: {},
});

export default LiveUpdatesSection;

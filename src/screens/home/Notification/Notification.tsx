import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  SectionList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';

// --- MODIFIED Dummy Data (Simplified without 'type') ---
// In a real app, you would fetch this data from an API.
const NOTIFICATION_DATA = [
  {
    title: 'Today, April 22',
    data: [
      {
        id: '1',
        source: 'BBC News',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2022.svg/1200px-BBC_News_2022.svg.png',
        text: 'has posted new europe news "Ukraine\'s President Zele..."',
        time: '15m ago',
      },
      {
        id: '2',
        source: 'Modelyn Saris',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: 'liked your recent post.', // Changed from 'is now following you'
        time: '1h ago',
      },
      {
        id: '3',
        source: 'Omar Merditz',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        text: 'commented on your news "Minting Your First NFT: A..."',
        time: '1h ago',
      },
    ],
  },
  {
    title: 'Yesterday, April 21',
    data: [
      {
        id: '4',
        source: 'Marley Botosh',
        image: 'https://randomuser.me/api/portraits/women/50.jpg',
        text: 'mentioned you in a comment.', // Changed from 'is now following you'
        time: '1 Day ago',
      },
      {
        id: '5',
        source: 'Modelyn Saris',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: 'likes your news "Minting Your First NFT: A..."',
        time: '1 Day ago',
      },
      {
        id: '6',
        source: 'CNN News',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/1200px-CNN.svg.png',
        text: 'has posted new travel news "Her train broke down. Her pho..."',
        time: '1 Day ago',
      },
    ],
  },
];

// --- MODIFIED Individual Notification Item Component ---
const NotificationItem = ({item}) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  return (
    <View style={[styles.itemContainer, {backgroundColor: colors.card}]}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text
          style={{
            fontSize: sizes.body,
            color: colors.text,
            fontFamily: fontFamily.regular,
          }}
          numberOfLines={2}>
          <Text
            style={{
              fontFamily: fontFamily.semiBold,
            }}>
            {item.source}{' '}
          </Text>
          {item.text}
        </Text>
        <Text
          style={[
            styles.itemTime,
            {
              fontSize: sizes.body,
              color: colors.text,
              opacity: 0.6,
              fontFamily: fontFamily.regular,
              letterSpacing: 1,
            },
          ]}>
          {item.time}
        </Text>
      </View>
      {/* --- The Follow Button has been REMOVED from here --- */}
    </View>
  );
};

const Notification = ({navigation}) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  return (
    <PageContainer style={{paddingTop:25,}}>
      <SafeAreaView style={styles.container}>
        <HeaderCompt showBackButton={true} title={t('notifications')} />

        {/* --- Notification List --- */}
        <SectionList
          sections={NOTIFICATION_DATA}
          keyExtractor={item => item.id}
          renderItem={({item}) => <NotificationItem item={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text
              style={[
                styles.sectionHeader,
                {
                  fontSize: sizes.subheading,
                  fontFamily: fontFamily.semiBold,
                  color: colors.text,
                  opacity: 0.7,
                },
              ]}>
              {title}
            </Text>
          )}
          contentContainerStyle={styles.listContentContainer}
        />
      </SafeAreaView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContentContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    paddingVertical: 12,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 4,
    padding: 4,
    borderRadius: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#e0e0e0', // a fallback background color
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },

  itemTime: {
    marginTop: 4,
  },
});

export default Notification;

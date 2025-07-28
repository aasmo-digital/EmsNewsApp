import React, {useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import {newsSections} from './const';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../../theme/color';
import {useNavigation} from '@react-navigation/native';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';

export default function SessionView() {
  const [selectedSection, setSelectedSection] = useState('all');
  const navigation = useNavigation();
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();

  const categories = [
    {key: 'all', title: 'All'},
    ...newsSections.map(section => ({
      key: section.sectionKey,
      title: section.sectionTitle,
    })),
  ];

  // Flatten all news for "All" view
  const allNews = newsSections.flatMap(section => section.news);

  const filteredNews =
    selectedSection === 'all'
      ? allNews
      : newsSections.find(sec => sec.sectionKey === selectedSection)?.news ||
        [];

  return (
    <View style={styles.container}>
      {/* Top Category Selector */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.key}
          contentContainerStyle={{paddingHorizontal: 10}}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.categoryBtn,
                {
                  backgroundColor: colors.background,
                },
                selectedSection === item.key && {
                  backgroundColor: colors.background,
                  borderWidth: 0.5,
                  borderColor: colors.text,
                },
              ]}
              onPress={() => setSelectedSection(item.key)}>
              <Text
                style={[
                  selectedSection === item.key && {
                    color: colors.background,
                    fontFamily: fontFamily.semiBold,
                  },
                  {
                    color: colors.text,
                    fontFamily: fontFamily.medium,
                    fontSize: sizes.body,
                  },
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* News Cards */}
      <View>
        <FlatList
          data={filteredNews}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingHorizontal: 10}}
          renderItem={({item}) => (
            <Pressable
              style={[
                styles.card,
                {shadowColor: colors.text, backgroundColor: colors.background},
              ]}
              onPress={() => navigation.navigate('NewsDetail')}>
              <View style={{flex: 1, marginRight: 8}}>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: sizes.subheading,
                      color: colors.text,
                      fontFamily: fontFamily.regular,
                    },
                  ]}
                  numberOfLines={1}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: sizes.body,
                    color: colors.text,
                    fontFamily: fontFamily.regular,
                    letterSpacing: 0.5,
                  }}
                  numberOfLines={2}>
                  {item?.description}
                </Text>
              </View>

              <Image
                source={{
                  uri: 'https://www.hindustantimes.com/ht-img/img/2025/07/22/550x309/Mumbai_train_blast_accused_1753162784155_1753162784325.jpg',
                }}
                style={styles.image}
              />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryBtnSelected: {
    backgroundColor: color.white,
    borderWidth: 0.5,
  },

  card: {
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    flex: 1,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    opacity: 0.8,
    letterSpacing: 0.5,
  },
});

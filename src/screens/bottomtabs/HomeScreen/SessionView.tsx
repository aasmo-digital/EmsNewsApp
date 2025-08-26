import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {newsSections} from './const';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../../theme/color';
import {useNavigation} from '@react-navigation/native';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {NewsCard} from '../../../components/cardIndex';
import HomeController from './HomeController';
import {NewsCardLoading} from '../../../components/skelotonindex';

export default function SessionView() {
  const {allNeewsLoading, allNeews} = HomeController();

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
  // const allNews = newsSections.flatMap(section => section.news);

  const filteredNews =
    selectedSection === 'all'
      ? allNeews
      : newsSections.find(sec => sec.sectionKey === selectedSection)?.news ||
        [];

  // ✅ Memoized keyExtractor
  const keyExtractor = useCallback(item => item.id.toString(), []);

  // ✅ Memoized renderItem
  const renderItem = useCallback(
    ({item}) => (
      <NewsCard
        item={item}
        location={item?.state?.name}
        onPressLocation={() =>
          navigation.navigate('NewsByState', {state: item?.state})
        }
      />
    ),
    [navigation],
  );

  // ✅ getItemLayout (agar fixed height approx pata ho)
  const getItemLayout = useCallback(
    (_, index) => ({length: 120, offset: 120 * index, index}), // 120 = approx row height
    [],
  );

  return (
    <View style={styles.container}>
      {/* Top Category Selector */}
      {/* <View>
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
                  borderWidth: 0.2,
                  borderColor: colors.text,
                  opacity: 0.7,
                },
                selectedSection === item.key && {
                  backgroundColor: colors.background,
                  borderWidth: 1,
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
      </View> */}

      {/* News Cards */}
      <View>
        {allNeewsLoading ? (
          <NewsCardLoading />
        ) : (
          <FlatList
            data={filteredNews}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            getItemLayout={getItemLayout} // optional but boosts perf
            removeClippedSubviews={true}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={10}
            contentContainerStyle={{paddingHorizontal: 10}}
            ListEmptyComponent={() => (
              <Text
                style={{
                  fontFamily: fontFamily.medium,
                  color: colors.text,
                  textAlign: 'center',
                  marginVertical: 20,
                }}>
                No News Found.
              </Text>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 8,
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

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
} from 'react-native';
import React, {useState} from 'react';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import color from '../../../theme/color';
import {categories, newsData} from '../HomeScreen/const';
import {getTimeAgo} from '../../../utility/functions/toast';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';

const Explore = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredNews = selectedCategory
    ? newsData.filter(item => item.categoryId === selectedCategory)
    : newsData;

  const {sizes, fontFamily} = useFontSize();
  const {colors, toggleTheme, mode} = useTheme();

  return (
    <PageContainer>
      {/* Category List */}
      <HeaderCompt showBackButton={true} title={'Explore News'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <FlatList
              data={categories}
              horizontal
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    selectedCategory === item.id && {
                      borderWidth: 0.5,
                      borderColor: colors.btnbg,
                      backgroundColor: colors.background,
                    },
                  ]}
                  onPress={() => setSelectedCategory(item.id)}>
                  <Text
                    style={{
                      color: colors.text,
                      fontFamily: fontFamily.medium,
                      fontSize: sizes.body,
                    }}>
                    {item.name}
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
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => navigation.navigate('NewsDetail')}
                  style={[styles.card, {backgroundColor: colors.card}]}>
                  <Image source={{uri: item.image}} style={styles.image} />
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
                      Indore
                    </Text>
                    <Text
                      style={[
                        styles.title,
                        {
                          color: colors.text,
                          fontFamily: fontFamily.semiBold,
                          fontSize: sizes.subheading,
                        },
                      ]}>
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.meta,
                        {
                          color: colors.text,
                          fontFamily: fontFamily.regular,
                          fontSize: sizes.body,
                        },
                      ]}>
                      By {getTimeAgo(item.date)} | {'👨‍🏫 ' + item.author}
                    </Text>
                  </View>
                </Pressable>
              )}
              ListEmptyComponent={() => (
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
              )}
            />
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default Explore;
const styles = StyleSheet.create({
  categoryList: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },

  card: {
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 8,
  },
  title: {
    marginTop: 4,
  },
  description: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 5,
  },
  meta: {
    marginTop: 5,
  },
  city: {
    opacity: 0.8,
  },
});

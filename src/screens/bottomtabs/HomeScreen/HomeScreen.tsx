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
import {PageContainer} from '../../../components/componentsIndex';
import {Marquee} from '@animatereactnative/marquee';
import color from '../../../theme/color';
import imageIndex from '../../../assets/imageIndex';
import {categories, newsData} from './const';
import LinearGradient from 'react-native-linear-gradient';
import SessionView from './SessionView';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';

const HomeScreen = ({navigation}: any) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();

  const filteredNews = selectedCategory
    ? newsData.filter(item => item.categoryId === selectedCategory)
    : newsData;

  const headlines = () => {
    return (
      <Marquee
        spacing={20}
        speed={1}
        style={{backgroundColor: color.appColor, marginTop: 5}}>
        <Text
          style={{
            color: color.white,
            paddingVertical: 5,
            fontSize: sizes.body,
            fontFamily: fontFamily.medium,
            letterSpacing: 0.5,
          }}>
          20 साल बाद ठाकरे परिवार एक साथ: उद्धव बोले- मराठी ने दूरियां खत्म कीं
          20 साल बाद ठाकरे परिवार एक साथ: उद्धव बोले- मराठी ने दूरियां खत्म कीं
        </Text>
      </Marquee>
    );
  };

  const header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Image
          source={imageIndex.logo}
          style={{height: 80, width: 50}}
          resizeMode="contain"
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable
            style={{marginRight: 10}}
            onPress={() => Alert.alert('dsghi')}>
            <Text
              style={{
                paddingHorizontal: 10,
                borderWidth: 1,
                color: colors.btnbg,
                borderColor: colors.btnbg,
                fontFamily: fontFamily.medium,
                fontSize: sizes.body,
              }}>
              e-Paper
            </Text>
          </Pressable>
          <Pressable
            onPress={() => Alert.alert('dsghi')}
            style={{marginRight: 10}}>
            <Image source={imageIndex.tv} style={{height: 30, width: 30}} />
          </Pressable>
          <Pressable
            onPress={() => Alert.alert('dsghi')}
            style={{marginRight: 10}}>
            <Image
              source={imageIndex.notification}
              style={{height: 25, width: 25, tintColor: colors.text}}
            />
          </Pressable>
          <Pressable
            onPress={() => Alert.alert('dsghi')}
            style={{marginRight: 10}}>
            <Image
              source={{
                uri: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
              }}
              style={{height: 35, width: 35, borderRadius: 50}}
            />
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <PageContainer>
      {header()}
      {/* Category List */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <FlatList
              data={categories}
              horizontal
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
              renderItem={({item}: any) => (
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    selectedCategory === item.id && styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(item.id)}>
                  <Text style={styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          {headlines()}

          {/* News Cards */}
          <View>
            <FlatList
              data={filteredNews}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => navigation.navigate('NewsDetail')}
                  style={styles.card}>
                  <Image source={{uri: item.image}} style={styles.image} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}>
                    <Text style={styles.meta}>
                      By {item.author} | {item.date}
                    </Text>
                    <Text style={styles.title}>{item.title}</Text>
                  </LinearGradient>
                </Pressable>
              )}
              // ListEmptyComponent={() => (
              //   <Text
              //     style={{
              //       color: color.black,
              //       height: 100,
              //     }}>
              //     No Data Found.
              //   </Text>
              // )}
            />
          </View>

          <SessionView />
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  categoryList: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  categoryButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: color.white,
    borderWidth: 0.5,
    borderColor: color.appColor,
  },
  categoryText: {
    color: '#000',
  },
  card: {
    width: 300,
    height: 200,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 4,
  },
  description: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 5,
  },
  meta: {
    color: '#aaa',
    fontSize: 10,
    marginTop: 5,
  },
});

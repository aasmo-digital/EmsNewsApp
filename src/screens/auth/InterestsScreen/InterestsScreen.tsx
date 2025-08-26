import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {PageContainer} from '../../../components/componentsIndex';
import imageIndex from '../../../assets/imageIndex';
import color from '../../../theme/color';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import {StateLoading} from '../../../components/skelotonindex';

// --- Data for the interest categories ---
const interestsData = [
  {id: '1', name: 'Sports', icon: '⚽'},
  {id: '2', name: 'Politics', icon: '🏛️'},
  {id: '3', name: 'Life', icon: '😊'},
  {id: '4', name: 'Gaming', icon: '🎮'},
  {id: '5', name: 'Animals', icon: '🐻'},
  {id: '6', name: 'Nature', icon: '🌴'},
  {id: '7', name: 'Food', icon: '🍔'},
  {id: '8', name: 'Art', icon: '🎨'},
  {id: '9', name: 'History', icon: '📜'},
  {id: '10', name: 'Fashion', icon: '👗'},
  {id: '11', name: 'Covid-19', icon: '😷'},
  {id: '12', name: 'Middle East', icon: '⚔️'},
];

// --- Main Screen Component ---
const InterestsScreen = ({navigation}: any) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

  // --- Toggles the selection of an interest ---
  const handleSelectInterest = id => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(item => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  // --- Renders each interest button in the grid ---
  const renderInterestItem = ({item}) => {
    const isSelected = selectedInterests.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.interestButton,
          isSelected && {
            borderColor: colors.primary,
            // backgroundColor: '#F0F8FF',
            borderWidth: 2,
          },
          {
            backgroundColor: colors.card,
          },
        ]}
        onPress={() => handleSelectInterest(item.id)}>
        <Text style={styles.interestIcon}>{item.icon}</Text>
        <Text
          style={{
            fontSize: sizes.subheading,
            fontFamily: fontFamily.semiBold,
            color: colors.text,
            letterSpacing: 0.5,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const [allInterestsDataLoading, setAllInterestsDataLoading] = useState(true);

  const [allInterestsData, setAllInterestsData] = useState([]);

  const getAllState = async () => {
    setAllInterestsDataLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.newCategory,
        method: 'GET',
      });
      if (response) {
        setAllInterestsDataLoading(false);
        setAllInterestsData(interestsData);
      } else {
        setAllInterestsDataLoading(false);
      }
    } catch (error: any) {
      setAllInterestsDataLoading(false);
      console.error(' Error:', error.message);
    }
  };

  useEffect(() => {
    getAllState();
  }, []);

  return (
    <PageContainer
      statusBarProps={{
        backgroundColor: 'transparent',
        barStyle: 'dark-content',
        translucent: true,
      }}>
      <ImageBackground
        source={imageIndex.bg}
        style={{flex: 1}}
        resizeMode="stretch">
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />

          <View style={styles.content}>
            <View style={styles.header}>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: sizes.heading,
                    fontFamily: fontFamily.semiBold,
                    color: colors.text,
                  },
                ]}>
                Pick your interests
              </Text>
              <Text
                style={{
                  fontSize: sizes.subheading,
                  fontFamily: fontFamily.regular,
                  color: colors.text,
                }}>
                We'll use this info to personalize your feed to recommend things
                you'll like.
              </Text>
            </View>

            {allInterestsDataLoading ? (
              <StateLoading />
            ) : (
              <FlatList
                data={allInterestsData}
                renderItem={renderInterestItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
              />
            )}
            {!allInterestsDataLoading && (
              <View style={styles.footer}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: colors.primary,
                      shadowColor: colors.text,
                    },
                  ]}>
                  <Text
                    style={{
                      color: color.white,
                      fontSize: sizes.body,
                      fontFamily: fontFamily.semiBold,
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PickYourState')}
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: colors.primary,
                      shadowColor: colors.text,
                    },
                  ]}>
                  <Text
                    style={{
                      color: color.white,
                      fontSize: sizes.body,
                      fontFamily: fontFamily.semiBold,
                    }}>
                    Skip
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </PageContainer>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  curveContainer: {
    position: 'absolute',
    zIndex: -1,
  },
  topLeft: {
    top: -20,
    left: -20,
  },
  bottomRight: {
    bottom: -20,
    right: -20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
    marginTop: 30,
  },

  grid: {
    paddingBottom: 20,
  },
  interestButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    margin: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },

  interestIcon: {
    marginRight: 10,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default InterestsScreen;

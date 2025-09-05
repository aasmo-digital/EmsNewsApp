import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {PageContainer} from '../../../components/componentsIndex';
import imageIndex from '../../../assets/imageIndex';
import color from '../../../theme/color';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import {StateLoading} from '../../../components/skelotonindex';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../services/redux/store';
import {
  NewsCategory,
  toggleInterest,
} from '../../../services/redux/slices/interestsSlice';

// --- Local dummy data (fallback) ---
const interestsData = [];

// --- Main Screen Component ---
const InterestsScreen = ({navigation}: any) => {
  const allNewsCategory = useSelector(
    (state: RootState) => state.newsCategory.newsCategory,
  );
  const dispatch = useDispatch();
  const selectedInterests = useSelector(
    (state: RootState) => state.interests.selected,
  );

  const [allInterest, setAllInterest] = useState(allNewsCategory);
  const [allInterestsDataLoading, setAllInterestsDataLoading] = useState(true);

  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  // --- Toggle handler ---
  // const handleSelectInterest = (id: string) => {
  //   dispatch(toggleInterest(id));
  // };

  // --- Toggle handler ---
  const handleSelectInterest = (interest: NewsCategory) => {
    // Change parameter type to NewsCategory
    dispatch(toggleInterest(interest)); // Pass the whole interest object
  };

  // --- Render each interest card ---
  // const renderInterestItem = ({item}) => {
  //   const isSelected = selectedInterests.includes(item.id);
  //   return (
  //     <TouchableOpacity
  //       style={[
  //         styles.interestButton,
  //         isSelected && {
  //           borderColor: colors.primary,
  //           borderWidth: 2,
  //         },
  //         {backgroundColor: colors.card},
  //       ]}
  //       onPress={() => handleSelectInterest(item.id)}>
  //       <Text style={styles.interestIcon}>{item.icon}</Text>
  //       <Text
  //         style={{
  //           fontSize: sizes.subheading,
  //           fontFamily: fontFamily.semiBold,
  //           color: colors.text,
  //           letterSpacing: 0.5,
  //         }}>
  //         {item.name}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };

  const renderInterestItem = ({item}: {item: NewsCategory}) => {
    // Change item type
    // Now you check if the ID is present, assuming `selectedInterests`
    // still holds full objects and you want to match by ID.
    // If you plan to iterate over selectedInterests and compare full objects,
    // you might need to adjust this.
    const isSelected = selectedInterests.some(
      selectedItem => selectedItem?._id === item?._id,
    );
    return (
      <TouchableOpacity
        style={[
          styles.interestButton,
          isSelected && {
            borderColor: colors.primary,
            borderWidth: 2,
          },
          {backgroundColor: colors.card},
        ]}
        onPress={() => handleSelectInterest(item)}>
        {/* Pass the whole item object */}
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

  // --- Fetch categories from API (optional, fallback to local interestsData) ---
  const getAllState = async () => {
    setAllInterestsDataLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.newCategory,
        method: 'GET',
      });
      console.log('---------------------', response);

      if (response?.success) {
        setAllInterestsDataLoading(false);

        console.log('---------------------', response?.data);
        setAllInterest(response?.data); // fallback to dummy data for now
      } else {
        setAllInterestsDataLoading(false);
      }
    } catch (error: any) {
      setAllInterestsDataLoading(false);
      console.error('Error:', error.message);
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

            {/* Show loader or interest list */}
            {allInterestsDataLoading ? (
              <StateLoading />
            ) : (
              <>
                {/* Agar koi interest selected nahi hai toh message dikhao */}
                {selectedInterests.length === 0 && (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'red',
                      marginBottom: 10,
                      fontSize: sizes.body,
                      fontFamily: fontFamily.regular,
                    }}>
                    No interests selected yet!
                  </Text>
                )}

                <FlatList
                  data={allInterest}
                  renderItem={renderInterestItem}
                  keyExtractor={item => item?.id}
                  numColumns={2}
                  contentContainerStyle={styles.grid}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}

            {/* Footer buttons */}
            {!allInterestsDataLoading && (
              <View style={styles.footer}>
                <TouchableOpacity
                  onP
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: colors.primary,
                      shadowColor: colors.text,
                    },
                  ]}
                  onPress={() => {
                    console.log('Saving interests:', selectedInterests);
                    navigation.goBack();
                  }}>
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

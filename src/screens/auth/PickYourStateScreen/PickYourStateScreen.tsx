import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
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

// --- Data for Indian States (you can modify/translate as needed) ---
const statesData = [
  {id: '1', name: 'Madhya Pradesh'},
  {id: '2', name: 'Maharashtra'},
  {id: '3', name: 'Uttar Pradesh'},
  {id: '4', name: 'Rajasthan'},
  {id: '5', name: 'Bihar'},
  {id: '6', name: 'Gujarat'},
  {id: '7', name: 'Punjab'},
  {id: '8', name: 'Tamil Nadu'},
  {id: '9', name: 'Kerala'},
  {id: '10', name: 'Delhi'},
  {id: '11', name: 'West Bengal'},
  {id: '12', name: 'Karnataka'},
];

const PickYourStateScreen = () => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  const [selectedStates, setSelectedStates] = useState([]);
  const [allstatesDataLoading, setAllstatesDataLoading] = useState(true);

  const [allstatesData, setAllstatesData] = useState([]);

  const handleSelectState = id => {
    if (selectedStates.includes(id)) {
      setSelectedStates(selectedStates.filter(item => item !== id));
    } else {
      setSelectedStates([...selectedStates, id]);
    }
  };

  const renderStateItem = ({item}) => {
    const isSelected = selectedStates.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.stateButton,
          isSelected && {
            borderColor: colors.primary,
            backgroundColor: colors.background,
            borderWidth: 2,
          },
          {backgroundColor: colors.card},
        ]}
        onPress={() => handleSelectState(item.id)}>
        <Text
          style={{
            fontSize: sizes.subheading,
            fontFamily: fontFamily.medium,
            color: colors.text,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

   const getAllState = async () => {
    setAllstatesDataLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.newCategory,
        method: 'GET',
      });
      if (response) {
        setAllstatesDataLoading(false);
        setAllstatesData(statesData);
      } else {
        setAllstatesDataLoading(false);
      }
    } catch (error: any) {
      setAllstatesDataLoading(false);
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
                Pick your state
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  {
                    fontSize: sizes.subheading,
                    color: colors.text,
                    fontFamily: fontFamily.regular,
                  },
                ]}>
                We'll use this info to personalize your experience based on your
                region.
              </Text>
            </View>

            {allstatesDataLoading ? (
              <StateLoading />
            ) : (
              <FlatList
                data={allstatesData}
                renderItem={renderStateItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
              />
            )}
            {!allstatesDataLoading && (
              <View style={styles.footer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: colors.primary,
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
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: colors.primary,
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

// --- Styles (same as before, renamed interest → state) ---
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
  subtitle: {
    lineHeight: 22,
  },
  grid: {
    paddingBottom: 20,
  },
  stateButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default PickYourStateScreen;

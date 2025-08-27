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
import styles from './style.pickyourstate';
import SelectCountryTab from './tabs/SelectCountryTab';
import SelectStateTab from './tabs/SelectStateTab';
import SelectCityTab from './tabs/SelectCityTab';

const PickYourStateScreen = () => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  const [selectedStates, setSelectedStates] = useState([]);

  const [selectedTab, setSelectedTab] = useState('country');

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

          {/* <View style={styles.content}>
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
                      fontSize: sizes.body + 2,
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
                      fontSize: sizes.body + 2,
                      fontFamily: fontFamily.semiBold,
                    }}>
                    Skip
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View> */}

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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => setSelectedTab('country')}
              style={{
                padding: 4,
                borderWidth: selectedTab == 'country' ? 1 : 0.5,
                borderRadius: 50,
                flex: 0.8,
                marginHorizontal: 10,
              }}>
              <Text style={{color: '#000', textAlign: 'center'}}> Country</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('state')}
              style={{
                padding: 4,
                borderWidth: selectedTab == 'state' ? 1 : 0.5,
                borderRadius: 50,
                flex: 0.8,
                marginHorizontal: 10,
              }}>
              <Text style={{color: '#000', textAlign: 'center'}}>State</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('city')}
              style={{
                padding: 4,
                borderWidth: selectedTab == 'city' ? 1 : 0.5,
                borderRadius: 50,
                flex: 0.8,
                marginHorizontal: 10,
              }}>
              <Text style={{color: '#000', textAlign: 'center'}}>City</Text>
            </TouchableOpacity>
          </View>

          {selectedTab == 'country' ? (
            <SelectCountryTab />
          ) : selectedTab == 'state' ? (
            <SelectStateTab selectedCountry={''} />
          ) : (
            <SelectCityTab stateId={''} />
          )}
        </View>
      </ImageBackground>
    </PageContainer>
  );
};

export default PickYourStateScreen;

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   StatusBar,
//   ImageBackground,
//   ActivityIndicator,
// } from 'react-native';
// import {PageContainer} from '../../../components/componentsIndex';
// import imageIndex from '../../../assets/imageIndex';
// import color from '../../../theme/color';
// import {useFontSize} from '../../../context/FontSizeContext';
// import {useTheme} from '../../../context/ThemeContext';
// import {useLanguage} from '../../../context/LanguageContext';
// import ApiRequest from '../../../services/api/ApiRequest';
// import ApiRoutes from '../../../services/config/ApiRoutes';
// import {StateLoading} from '../../../components/skelotonindex';
// import styles from './style.pickyourstate';

// const PickYourStateScreen = () => {
//   const {sizes, fontFamily} = useFontSize();
//   const {colors, mode} = useTheme();
//   const {t} = useLanguage();
//   const [selectedStates, setSelectedStates] = useState([]);
//   const [country, setcountry] = useState([]);
//   const [countryLoading, setCountryLoading] = useState(false);
//   const [allstatesData, setAllstatesData] = useState([]);
//   const [allstatesDataLoading, setAllstatesDataLoading] = useState(true);
//   const [cities, setCities] = useState([]);
//   const [cityLoading, setCityLoading] = useState(false);

//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');

//   const handleSelectState = id => {
//     if (selectedStates.includes(id)) {
//       setSelectedStates(selectedStates.filter(item => item !== id));
//     } else {
//       setSelectedStates([...selectedStates, id]);
//     }
//   };

//   const renderStateItem = ({item}) => {
//     const isSelected = selectedStates.includes(item.id);
//     return (
//       <TouchableOpacity
//         style={[
//           styles.stateButton,
//           isSelected && {
//             borderColor: colors.primary,
//             backgroundColor: colors.background,
//             borderWidth: 2,
//           },
//           {backgroundColor: colors.card},
//         ]}
//         onPress={() => handleSelectState(item.id)}>
//         <Text
//           style={{
//             fontSize: sizes.subheading,
//             fontFamily: fontFamily.medium,
//             color: colors.text,
//           }}>
//           {item.name}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const getAllCountry = async () => {
//     setCountryLoading(true);
//     try {
//       const response = await ApiRequest({
//         BaseUrl: ApiRoutes.getAllCountries,
//         method: 'GET',
//       });
//       if (response?.data) {
//         setCountryLoading(false);
//         console.log('-------state data----', response?.data);
//         setcountry(response?.data);
//       } else {
//         setCountryLoading(false);
//       }
//     } catch (error: any) {
//       setCountryLoading(false);
//       console.error(' Error:', error.message);
//     }
//   };

//   const getAllState = async () => {
//     setAllstatesDataLoading(true);
//     try {
//       const response = await ApiRequest({
//         BaseUrl: ApiRoutes.getStatesByCountryId + selectedCountry + '/states',
//         method: 'GET',
//       });
//       if (response?.data) {
//         setAllstatesDataLoading(false);
//         console.log('-------state data----', response?.data);
//         setAllstatesData(response?.data);
//       } else {
//         setAllstatesDataLoading(false);
//       }
//     } catch (error: any) {
//       setAllstatesDataLoading(false);
//       console.error(' Error:', error.message);
//     }
//   };

//   const getAllCity = async () => {
//     setCityLoading(true);
//     try {
//       const response = await ApiRequest({
//         BaseUrl: ApiRoutes.getAllCountries,
//         method: 'GET',
//       });
//       if (response?.data) {
//         setCityLoading(false);
//         console.log('-------city data----', response?.data);
//         setCities(response?.data);
//       } else {
//         setCityLoading(false);
//       }
//     } catch (error: any) {
//       setCityLoading(false);
//       console.error(' Error:', error.message);
//     }
//   };

//   useEffect(() => {
//     getAllCountry();
//   }, []);

//   return (
//     <PageContainer
//       statusBarProps={{
//         backgroundColor: 'transparent',
//         barStyle: 'dark-content',
//         translucent: true,
//       }}>
//       <ImageBackground
//         source={imageIndex.bg}
//         style={{flex: 1}}
//         resizeMode="stretch">
//         <View style={styles.container}>
//           <StatusBar barStyle="dark-content" />

//           <View style={styles.content}>
//             <View style={styles.header}>
//               <Text
//                 style={[
//                   styles.title,
//                   {
//                     fontSize: sizes.heading,
//                     fontFamily: fontFamily.semiBold,
//                     color: colors.text,
//                   },
//                 ]}>
//                 Pick your state
//               </Text>
//               <Text
//                 style={[
//                   styles.subtitle,
//                   {
//                     fontSize: sizes.subheading,
//                     color: colors.text,
//                     fontFamily: fontFamily.regular,
//                   },
//                 ]}>
//                 We'll use this info to personalize your experience based on your
//                 region.
//               </Text>
//             </View>

//             {allstatesDataLoading ? (
//               <StateLoading />
//             ) : (
//               <FlatList
//                 data={allstatesData}
//                 renderItem={renderStateItem}
//                 keyExtractor={item => item.id}
//                 numColumns={2}
//                 contentContainerStyle={styles.grid}
//                 showsVerticalScrollIndicator={false}
//               />
//             )}
//             {!allstatesDataLoading && (
//               <View style={styles.footer}>
//                 <TouchableOpacity
//                   activeOpacity={0.7}
//                   style={[
//                     styles.actionButton,
//                     {
//                       backgroundColor: colors.primary,
//                     },
//                   ]}>
//                   <Text
//                     style={{
//                       color: color.white,
//                       fontSize: sizes.body + 2,
//                       fontFamily: fontFamily.semiBold,
//                     }}>
//                     Save
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.actionButton,
//                     {
//                       backgroundColor: colors.primary,
//                     },
//                   ]}>
//                   <Text
//                     style={{
//                       color: color.white,
//                       fontSize: sizes.body + 2,
//                       fontFamily: fontFamily.semiBold,
//                     }}>
//                     Skip
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </View>
//       </ImageBackground>
//     </PageContainer>
//   );
// };

// export default PickYourStateScreen;

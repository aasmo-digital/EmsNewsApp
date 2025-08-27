import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {PageContainer} from '../../../components/componentsIndex';
import imageIndex from '../../../assets/imageIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';

import styles from './style.pickyourstate';
import SelectCountryTab from './tabs/SelectCountryTab';
import SelectStateTab from './tabs/SelectStateTab';
import SelectCityTab from './tabs/SelectCityTab';
import color from '../../../theme/color';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCity,
  setCountry,
  setState,
} from '../../../services/redux/slices/SelectedLocationSlice';

const PickYourStateScreen = () => {
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  const [selectedTab, setSelectedTab] = useState<'country' | 'state' | 'city'>(
    'country',
  );
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');

  const dispatch = useDispatch();
  // const location = useSelector((state: any) => state.SelectLocationSlice);

  // console.log('-----------location---------', location);

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

          {/* Header */}
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
              Pick your {selectedTab}
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

          {/* Tab Navigation */}
          <View style={localStyles.tabContainer}>
            {['country', 'state', 'city'].map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab as any)}
                disabled={
                  (tab === 'state' && !selectedCountryId) ||
                  (tab === 'city' && !selectedStateId)
                }
                style={[
                  localStyles.tabButton,
                  {
                    borderWidth: selectedTab === tab ? 1.5 : 0.5,
                    borderColor: selectedTab === tab ? colors.primary : '#ccc',
                  },
                ]}>
                <Text
                  style={{
                    color: selectedTab === tab ? colors.primary : colors.text,
                    textAlign: 'center',
                  }}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Content */}
          {selectedTab === 'country' ? (
            <SelectCountryTab
              onSelect={(id, country) => {
                console.log('----country--', country?._id, country?.name);
                dispatch(setCountry({id: country?._id, name: country?.name}));

                setSelectedCountryId(id);
                setSelectedStateId('');
                setSelectedCityId('');
                setSelectedTab('state');
              }}
            />
          ) : selectedTab === 'state' ? (
            <SelectStateTab
              selectedCountry={selectedCountryId}
              onSelect={(id, state) => {
                console.log('----state--', state?._id, state?.name);
                dispatch(setState({id: state?._id, name: state?.name}));

                setSelectedStateId(id);
                setSelectedCityId('');
                setSelectedTab('city');
              }}
            />
          ) : (
            <SelectCityTab
              stateId={selectedStateId}
              onSelect={(id, city) => {
                console.log('----city--', city?._id, city?.name);
                dispatch(setCity({id: city?._id, name: city?.name}));

                setSelectedCityId(id);
                console.log('✅ Final Selection:', {
                  country: selectedCountryId,
                  state: selectedStateId,
                  city: id,
                });
                // 👉 Here you can navigate forward or save the data
              }}
            />
          )}
        </View>

        {(selectedCountryId || selectedStateId || selectedCityId) && (
          <View style={styles.footer}>
            {/* Agar sab select hai toh Save button dikhayenge */}
            {selectedCountryId && selectedStateId && selectedCityId ? (
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
            ) : (
              // Agar abhi tak kuch bhi final select nahi hai toh Skip button
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
            )}
          </View>
        )}
      </ImageBackground>
    </PageContainer>
  );
};

export default PickYourStateScreen;

const localStyles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabButton: {
    padding: 6,
    borderRadius: 50,
    flex: 0.8,
    marginHorizontal: 10,
  },
});

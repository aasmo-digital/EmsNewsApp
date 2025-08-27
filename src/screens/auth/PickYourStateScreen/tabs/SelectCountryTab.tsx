import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ApiRequest from '../../../../services/api/ApiRequest';
import ApiRoutes from '../../../../services/config/ApiRoutes';
import {StateLoading} from '../../../../components/skelotonindex';
import {useFontSize} from '../../../../context/FontSizeContext';
import {useTheme} from '../../../../context/ThemeContext';
import {useLanguage} from '../../../../context/LanguageContext';

interface Country {
  _id: string;
  name: string;
}

interface Props {
  onSelect?: (countryId: string, country: Country) => void;
}

const SelectCountryTab: React.FC<Props> = ({onSelect}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  /** Fetch Countries */
  const getAllCountries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllCountries,
        method: 'GET',
      });
      if (response?.data) {
        setCountries(response.data);
      }
    } catch (error: any) {
      console.error('Error fetching countries:', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  /** Select Country */
  const handleSelectCountry = useCallback(
    (item: Country) => {
      setSelectedCountry(item._id);
      if (onSelect) {
        onSelect(item._id, item);
      }
    },
    [onSelect],
  );

  /** Render Item */
  const renderCountryItem = useCallback(
    ({item}: {item: Country}) => {
      const isSelected = selectedCountry === item._id;
      return (
        <TouchableOpacity
          style={[
            styles.countryButton,
            {backgroundColor: colors.card},
            isSelected && {
              borderColor: colors.primary,
              backgroundColor: colors.background,
              borderWidth: 2,
            },
          ]}
          onPress={() => handleSelectCountry(item)}
          activeOpacity={0.7}>
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
    },
    [selectedCountry, colors, sizes, fontFamily, handleSelectCountry],
  );

  const keyExtractor = useCallback((item: Country) => item._id, []);

  /** Memoized List */
  const countryList = useMemo(
    () => (
      <FlatList
        data={countries}
        renderItem={renderCountryItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={{padding: 20,paddingBottom:100}}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        getItemLayout={(_, index) => ({
          length: 90, // approx height of each item
          offset: 90 * index,
          index,
        })}
      />
    ),
    [countries, renderCountryItem, keyExtractor],
  );

  return <View>{loading ? <StateLoading /> : countryList}</View>;
};

export default React.memo(SelectCountryTab);

const styles = StyleSheet.create({
  countryButton: {
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
});

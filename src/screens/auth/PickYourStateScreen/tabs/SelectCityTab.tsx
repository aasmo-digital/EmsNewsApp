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

interface City {
  _id: string;
  name: string;
}

interface Props {
  stateId: string;
  onSelect?: (cityId: string, city: City) => void;
}

const SelectCityTab: React.FC<Props> = ({stateId, onSelect}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();

  /** Fetch Cities */
  const getAllCities = useCallback(async () => {
    if (!stateId) return;
    setLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: `${ApiRoutes.getCitiesByStateId}${stateId}/cities`,
        method: 'GET',
      });
      if (response?.data) {
        setCities(response.data);
      }
    } catch (error: any) {
      console.error('Error fetching cities:', error.message);
    } finally {
      setLoading(false);
    }
  }, [stateId]);

  useEffect(() => {
    getAllCities();
  }, [getAllCities]);

  /** Select City */
  const handleSelectCity = useCallback(
    (item: City) => {
      setSelectedCity(item._id);
      if (onSelect) {
        onSelect(item._id, item);
      }
    },
    [onSelect],
  );

  /** Render Item */
  const renderCityItem = useCallback(
    ({item}: {item: City}) => {
      const isSelected = selectedCity === item._id;
      return (
        <TouchableOpacity
          style={[
            styles.cityButton,
            {backgroundColor: colors.card},
            isSelected && {
              borderColor: colors.primary,
              backgroundColor: colors.background,
              borderWidth: 2,
            },
          ]}
          onPress={() => handleSelectCity(item)}
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
    [selectedCity, colors, sizes, fontFamily, handleSelectCity],
  );

  const keyExtractor = useCallback((item: City) => item._id, []);

  /** Memoized FlatList */
  const cityList = useMemo(
    () => (
      <FlatList
        data={cities}
        renderItem={renderCityItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={{padding: 20,paddingBottom:100}}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        getItemLayout={(_, index) => ({
          length: 90,
          offset: 90 * index,
          index,
        })}
      />
    ),
    [cities, renderCityItem, keyExtractor],
  );

  return <View>{loading ? <StateLoading /> : cityList}</View>;
};

export default React.memo(SelectCityTab);

const styles = StyleSheet.create({
  cityButton: {
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

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

interface State {
  _id: string;
  name: string;
}

interface Props {
  selectedCountry: string;
  onSelect?: (stateId: string, state: State) => void;
}

const SelectStateTab: React.FC<Props> = ({selectedCountry, onSelect}) => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();

  /** Fetch States */
  const getAllStates = useCallback(async () => {
    if (!selectedCountry) return;
    setLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: `${ApiRoutes.getStatesByCountryId}${selectedCountry}/states`,
        method: 'GET',
      });
      if (response?.data) {
        setStates(response.data);
      }
    } catch (error: any) {
      console.error('Error fetching states:', error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCountry]);

  useEffect(() => {
    getAllStates();
  }, [getAllStates]);

  /** Select State */
  const handleSelectState = useCallback(
    (item: State) => {
      setSelectedState(item._id);
      if (onSelect) {
        onSelect(item._id, item);
      }
    },
    [onSelect],
  );

  /** Render Item */
  const renderStateItem = useCallback(
    ({item}: {item: State}) => {
      const isSelected = selectedState === item._id;
      return (
        <TouchableOpacity
          style={[
            styles.stateButton,
            {backgroundColor: colors.card},
            isSelected && {
              borderColor: colors.primary,
              backgroundColor: colors.background,
              borderWidth: 2,
            },
          ]}
          onPress={() => handleSelectState(item)}
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
    [selectedState, colors, sizes, fontFamily, handleSelectState],
  );

  const keyExtractor = useCallback((item: State) => item._id, []);

  /** Memoized FlatList */
  const stateList = useMemo(
    () => (
      <FlatList
        data={states}
        renderItem={renderStateItem}
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
    [states, renderStateItem, keyExtractor],
  );

  return <View>{loading ? <StateLoading /> : stateList}</View>;
};

export default React.memo(SelectStateTab);

const styles = StyleSheet.create({
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
});

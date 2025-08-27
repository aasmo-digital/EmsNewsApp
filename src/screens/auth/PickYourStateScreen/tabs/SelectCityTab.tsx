import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ApiRequest from '../../../../services/api/ApiRequest';
import ApiRoutes from '../../../../services/config/ApiRoutes';

const SelectCityTab = ({stateId}) => {
  console.log('----------stateId--------', stateId);
  const [cities, setCities] = useState([]);
  const [cityLoading, setCityLoading] = useState(false);

  const getAllCity = async () => {
    setCityLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getCitiesByStateId + stateId + '/cities',
        method: 'GET',
      });
      if (response?.data) {
        setCityLoading(false);
        console.log('-------city data----', response?.data);
        setCities(response?.data);
      } else {
        setCityLoading(false);
      }
    } catch (error: any) {
      setCityLoading(false);
      console.error(' Error:', error.message);
    }
  };

  return (
    <View>
      <Text style={{color: '#000'}}>SelectCityTab</Text>
    </View>
  );
};

export default SelectCityTab;

const styles = StyleSheet.create({});

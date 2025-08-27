import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ApiRequest from '../../../../services/api/ApiRequest';
import ApiRoutes from '../../../../services/config/ApiRoutes';

const SelectCountryTab = ({}) => {
  const [country, setcountry] = useState([]);
  const [countryLoading, setCountryLoading] = useState(false);

  const getAllCountry = async () => {
    setCountryLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllCountries,
        method: 'GET',
      });
      if (response?.data) {
        setCountryLoading(false);
        console.log('-------state data----', response?.data);
        setcountry(response?.data);
      } else {
        setCountryLoading(false);
      }
    } catch (error: any) {
      setCountryLoading(false);
      console.error(' Error:', error.message);
    }
  };

  return (
    <View>
      <Text style={{color: '#000'}}>SelectCountryTab</Text>
    </View>
  );
};

export default SelectCountryTab;

const styles = StyleSheet.create({});

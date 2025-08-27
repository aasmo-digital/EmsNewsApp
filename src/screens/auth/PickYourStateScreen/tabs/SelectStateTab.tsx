import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ApiRequest from '../../../../services/api/ApiRequest';
import ApiRoutes from '../../../../services/config/ApiRoutes';

const SelectStateTab = ({selectedCountry}: any) => {
  console.log('---------selectedCountry-------', selectedCountry);
  const [allstatesData, setAllstatesData] = useState([]);
  const [allstatesDataLoading, setAllstatesDataLoading] = useState(true);

  const getAllState = async () => {
    setAllstatesDataLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getStatesByCountryId + selectedCountry + '/states',
        method: 'GET',
      });
      if (response?.data) {
        setAllstatesDataLoading(false);
        console.log('-------state data----', response?.data);
        setAllstatesData(response?.data);
      } else {
        setAllstatesDataLoading(false);
      }
    } catch (error: any) {
      setAllstatesDataLoading(false);
      console.error(' Error:', error.message);
    }
  };
  return (
    <View>
      <Text style={{color: '#000'}}>SelectStateTab</Text>
    </View>
  );
};

export default SelectStateTab;

const styles = StyleSheet.create({});

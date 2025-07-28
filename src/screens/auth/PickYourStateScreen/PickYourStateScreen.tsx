import React, {useState} from 'react';
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
  const [selectedStates, setSelectedStates] = useState([]);

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
        style={[styles.stateButton, isSelected && styles.selectedStateButton]}
        onPress={() => handleSelectState(item.id)}>
        <Text style={styles.stateText}>{item.name}</Text>
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

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Pick your state</Text>
              <Text style={styles.subtitle}>
                We'll use this info to personalize your experience based on your
                region.
              </Text>
            </View>

            <FlatList
              data={statesData}
              renderItem={renderStateItem}
              keyExtractor={item => item.id}
              numColumns={2}
              contentContainerStyle={styles.grid}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Skip</Text>
              </TouchableOpacity>
            </View>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
    marginTop: 30,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  grid: {
    paddingBottom: 20,
  },
  stateButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
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
  selectedStateButton: {
    borderColor: '#06113C',
    backgroundColor: '#F0F8FF',
  },
  stateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: color.appColor,
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
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PickYourStateScreen;

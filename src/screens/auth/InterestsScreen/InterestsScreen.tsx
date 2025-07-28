import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {PageContainer} from '../../../components/componentsIndex';
import imageIndex from '../../../assets/imageIndex';
import color from '../../../theme/color';

// --- Data for the interest categories ---
const interestsData = [
  {id: '1', name: 'Sports', icon: '⚽'},
  {id: '2', name: 'Politics', icon: '🏛️'},
  {id: '3', name: 'Life', icon: '😊'},
  {id: '4', name: 'Gaming', icon: '🎮'},
  {id: '5', name: 'Animals', icon: '🐻'},
  {id: '6', name: 'Nature', icon: '🌴'},
  {id: '7', name: 'Food', icon: '🍔'},
  {id: '8', name: 'Art', icon: '🎨'},
  {id: '9', name: 'History', icon: '📜'},
  {id: '10', name: 'Fashion', icon: '👗'},
  {id: '11', name: 'Covid-19', icon: '😷'},
  {id: '12', name: 'Middle East', icon: '⚔️'},
];

// --- Main Screen Component ---
const InterestsScreen = ({navigation}: any) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  // --- Toggles the selection of an interest ---
  const handleSelectInterest = id => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(item => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  // --- Renders each interest button in the grid ---
  const renderInterestItem = ({item}) => {
    const isSelected = selectedInterests.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.interestButton,
          isSelected && styles.selectedInterestButton,
        ]}
        onPress={() => handleSelectInterest(item.id)}>
        <Text style={styles.interestIcon}>{item.icon}</Text>
        <Text style={styles.interestText}>{item.name}</Text>
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
          {/* <TopLeftCurve />
      <BottomRightCurve /> */}

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Pick your interests</Text>
              <Text style={styles.subtitle}>
                We'll use this info to personalize your feed to recommend things
                you'll like.
              </Text>
            </View>

            <FlatList
              data={interestsData}
              renderItem={renderInterestItem}
              keyExtractor={item => item.id}
              numColumns={2}
              contentContainerStyle={styles.grid}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PickYourState')}
                style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </PageContainer>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  curveContainer: {
    position: 'absolute',
    zIndex: -1,
  },
  topLeft: {
    top: -20,
    left: -20,
  },
  bottomRight: {
    bottom: -20,
    right: -20,
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
  interestButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  selectedInterestButton: {
    borderColor: '#06113C', // A dark blue for selection
    backgroundColor: '#F0F8FF', // A light blue tint for selection background
  },
  interestIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  interestText: {
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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

export default InterestsScreen;

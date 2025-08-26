import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';
import {CATEGORIES, DUMMY_CHANNELS} from './Consts';
import styles from './emstv.style';

// === DUMMY DATA ===
// Asli app mein yeh data aapki API se aayega.
// Maine ek free HLS test stream ka URL use kiya hai.

const EmsTv = () => {
  // --- STATE MANAGEMENT ---
  const [allChannels, setAllChannels] = useState([]); // API se aayi original list
  const [currentChannel, setCurrentChannel] = useState(null); // Jo channel abhi play ho rha hai
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(''); // Search bar ka text
  const [selectedCategory, setSelectedCategory] = useState('All'); // Selected category tab

  // --- DATA FETCHING ---
  useEffect(() => {
    // Yeh function API se data laayega
    const fetchChannels = async () => {
      try {
        // Asli API call yahan aayegi, jaise:
        // const response = await axios.get('https://your-api.com/channels');
        // setAllChannels(response.data.channels);

        // Abhi ke liye hum DUMMY_CHANNELS use kar rahe hain
        // API call ko simulate karne ke liye 1 second ka delay
        setTimeout(() => {
          setAllChannels(DUMMY_CHANNELS);
          setCurrentChannel(DUMMY_CHANNELS[0]); // Pehla channel default play kar do
          setIsLoading(false);
        }, 1000);
      } catch (e) {
        setError('Failed to load channels. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchChannels();
  }, []); // [] ka matlab yeh effect sirf ek baar component mount hone par chalega

  // --- FILTERING LOGIC ---
  const filteredChannels = useMemo(() => {
    let channels = allChannels;

    // Category ke hisab se filter
    if (selectedCategory !== 'All') {
      channels = channels.filter(c => c.category === selectedCategory);
    }

    // Search query ke hisab se filter
    if (searchQuery) {
      channels = channels.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return channels;
  }, [allChannels, selectedCategory, searchQuery]); // Yeh tabhi re-calculate hoga jab inme se kuch change hoga

  // --- RENDER FUNCTIONS ---
  const renderChannelItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.channelItem,
        currentChannel?.id === item.id && styles.activeChannelItem, // Active channel ko highlight karo
      ]}
      onPress={() => setCurrentChannel(item)}>
      <Image source={{uri: item.logo_url}} style={styles.channelLogo} />
      <Text style={styles.channelName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Loading state UI
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading Channels...</Text>
      </View>
    );
  }

  // Error state UI
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // --- MAIN COMPONENT UI ---
  return (
    <SafeAreaView style={styles.container}>
      {/* Video Player Section */}
      <View style={styles.playerContainer}>
        {currentChannel ? (
          <Video
            source={{uri: currentChannel.stream_url}}
            style={styles.videoPlayer}
            controls={true} // Default controls dikhayega
            resizeMode="contain"
            onError={e => console.log('Video Error:', e)}
            onBuffer={e => console.log('Buffering:', e)}
            playInBackground={false}
            onLoadStart={() => <ActivityIndicator size={'large'} />}
            
          />
        ) : (
          <View style={styles.noVideoContainer}>
            <Text style={styles.noVideoText}>Select a channel to play</Text>
          </View>
        )}
      </View>

      {/* Controls: Search and Categories */}
      <View style={styles.controlsContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a channel..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.categoryScroller}>
          <FlatList
            data={CATEGORIES}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === item && styles.activeCategoryButton,
                ]}
                onPress={() => setSelectedCategory(item)}>
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {/* Channel List Section */}
      <FlatList
        data={filteredChannels}
        renderItem={renderChannelItem}
        keyExtractor={item => item.id}
        style={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>No channels found.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default EmsTv;

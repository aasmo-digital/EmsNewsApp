import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  Share,
} from 'react-native';
import React, {memo, useRef, useState} from 'react';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import imageIndex from '../../assets/imageIndex';
import color from '../../theme/color';
import ApiRequest from '../../services/api/ApiRequest';
import ApiRoutes from '../../services/config/ApiRoutes';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

// MODIFIED: Now it accepts playerHeight as a prop
const SingleReel = ({item, isVisible, playerHeight, onPressComment, style}) => {
  const token = useSelector(state => state.UserData?.token);

  // console.log('--Reel Item----', item);
  const videoRef = useRef(null);
  const isScreenFocused = useIsFocused();
  const onBuffer = buffer => console.log('buffering...', buffer);
  const onError = error => console.log('error', error);

  const [isLiked, setIsLiked] = useState(item?.isLikedByCurrentUser || false);
  const [likeCount, setLikeCount] = useState(item?.likesCount || 0);

  const [loading, setLoading] = useState(false);

  // Function to handle the like action
  const handleLike = async () => {
    if (loading) return; // ek hi request ek time pe chale

    setLoading(true);

    try {
      const response = await ApiRequest({
        BaseUrl: `${ApiRoutes.likeDislikeShorts}${item?._id}/like`,
        method: 'POST',
        token: token,
      });

      if (response?.success) {
        // Toggle like state
        const newLikeState = !isLiked;
        setIsLiked(newLikeState);

        // Update like count
        setLikeCount(prev => (newLikeState ? prev + 1 : Math.max(prev - 1, 0)));
      } else {
        console.warn('Like API failed:', response?.message);
      }
    } catch (error) {
      console.error('handleLike Error:', error?.message || error);
    } finally {
      setLoading(false);
    }
  };
  // Function to handle the share action
  const handleShare = async () => {
    try {
      await Share.share({
        // The message you want to share
        message: `Check out this awesome video! \n\n${item?.caption}`,
      });
    } catch (error) {
      console.log('Share Error:', error.message);
    }
  };

  // A helper function to format large numbers (e.g., 12345 -> 12.3k)
  const formatCount = count => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  return (
    // MODIFIED: The style now uses the passed playerHeight
    <View style={[styles.container, {height: playerHeight}]}>
      <StatusBar translucent backgroundColor={'transparent'} />

      <Video
        ref={videoRef}
        onBuffer={onBuffer}
        onError={onError}
        source={{uri: item?.videoUrl}}
        resizeMode="cover"
        repeat={true}
        // paused={!isVisible}
        paused={!isVisible || !isScreenFocused}
        style={[styles.video, style]}
      />
      <View style={styles.overlay}>
        {/* <Image
          source={imageIndex?.logo}
          style={{
            height: 80,
            width: 70,
            position: 'absolute',
            top: 40,
            left: 10,
            resizeMode: 'stretch',
            borderRadius: 10,
          }}
        /> */}
        {/* <View style={styles.bottomSection}>
          <View style={styles.bottomLeftSection}>
            <View style={styles.channelName}>
              <Image source={{uri: item?.user?.avatar}} style={styles.avatar} />
              <Text style={styles.channelNameText}>{item?.user?.username}</Text>
            </View>
            <Text style={styles.caption}>{item?.caption}</Text>
            <View style={styles.musicNameContainer}>
              <Ionicons name="musical-note" size={15} color="white" />
              <Text style={styles.musicName}>
                Original Audio - {item?.user?.username}
              </Text>
            </View>
          </View>
        </View> */}

        <View style={styles.bottomSection}>
          <View style={styles.bottomLeftSection}>
            <Text style={styles.channelNameText}>{item?.description}</Text>
          </View>
        </View>

        <View style={styles.bottomRightSection}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <AntDesign
              name="heart"
              size={30}
              color={isLiked ? color.warning : color.white}
            />
            <Text style={styles.actionButtonText}>
              {' '}
              {formatCount(likeCount)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onPressComment}>
            <Ionicons name="chatbubble-ellipses" size={30} color="white" />
            <Text style={styles.actionButtonText}>{item?.commentsCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <FontAwesome name="share" size={30} color="white" />
            {/* <Text style={styles.actionButtonText}>{item?.shares}</Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    // height is now set dynamically
    backgroundColor: 'black',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    // MODIFIED: Reduced paddingBottom since the tab bar is no longer covering it
    paddingBottom: 15,
    position: 'absolute',
    bottom: 10,
  },
  // ... (rest of the styles are the same)
  bottomLeftSection: {flex: 4},
  bottomRightSection: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    right: 5,
    position: 'absolute',
    bottom: 10,
  },
  channelName: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 10,
  },
  channelNameText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  caption: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  musicNameContainer: {flexDirection: 'row', alignItems: 'center'},
  musicName: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  actionButton: {alignItems: 'center', marginVertical: 10},
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});

export default memo(SingleReel);

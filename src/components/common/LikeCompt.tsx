import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, memo} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import ApiRequest from '../../services/api/ApiRequest';
import ApiRoutes from '../../services/config/ApiRoutes';
import {useSelector} from 'react-redux';
// 1. Aapke custom ApiRequest function ko import kiya

// Ek central jagah par API ka base URL define karein (ya environment variable se lein)

// Component ke props ke liye ek interface
interface LikeComptProps {
  item: {
    _id: string; // News ki ID
    likes: number; // Shuruwati likes
    isLiked: boolean; // Kya user ne pehle se like kiya hai?
  };
}

const LikeCompt = ({item}: LikeComptProps) => {
  // console.log('========likeCompt--------', item?._id);
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();

  const token = useSelector(state => state?.UserData?.token);

  const [isLiked, setIsLiked] = useState(item?.isLiked || false);
  const [likeCount, setLikeCount] = useState(item?.likesCount || 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikePress = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    const originalLikedState = isLiked;
    const originalLikeCount = likeCount;

    setIsLiked(!originalLikedState);
    setLikeCount(
      originalLikedState ? originalLikeCount - 1 : originalLikeCount + 1,
    );

    try {
      await ApiRequest({
        // BaseUrl: `${ApiRoutes.getAllNews}/news/${item.id}/like`, // Poora URL banaya
        BaseUrl: `${ApiRoutes.addLikeNews}+/ ${item?._id}/like`,
        method: 'POST',
        token: token,

        // Agar body mein kuch bhejna hai to 'request' property use karein
        // request: { userId: 'some-user-id' }
      });

      // Agar API call successful hui, to kuch karne ki zaroorat nahi.
    } catch (error) {
      console.error('Failed to update like status:', error);
      Alert.alert('Error', 'Could not complete the action. Please try again.');

      // API fail hone par UI ko wapas purani state par le aayein
      setIsLiked(originalLikedState);
      setLikeCount(originalLikeCount);
    } finally {
      setIsLoading(false);
    }
  };

  const iconName = isLiked ? 'heart' : 'heart-o';
  const iconColor = isLiked ? colors.primary || 'red' : colors.text;

  return (
    <TouchableOpacity
      style={styles.interactionItem}
      onPress={handleLikePress}
      disabled={isLoading}
      activeOpacity={0.7}>
      <Icon name={iconName} size={20} color={iconColor} />

      <Text
        style={[
          styles.interactionText,
          {
            fontSize: sizes.body,
            color: colors.text,
            fontFamily: fontFamily.regular,
          },
        ]}>
        {likeCount}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(LikeCompt);

const styles = StyleSheet.create({
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 24,
  },
  interactionText: {
    marginLeft: 6,
    letterSpacing: 1,
  },
});

import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {useLanguage} from '../../context/LanguageContext';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import YoutubePlayer from 'react-native-youtube-iframe';

// 🔹 Extract YouTube Video ID
const getYoutubeId = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const VideoCard = memo(({item, style}: {item: any; style: any}) => {
  const videoId = getYoutubeId(item?.videoUrl);
  const {t} = useLanguage();
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.card,
        style,
        {backgroundColor: colors.card, shadowColor: colors.text},
      ]}>
      {videoId ? (
        <YoutubePlayer height={220} play={false} videoId={videoId} />
      ) : (
        <TouchableOpacity
          onPress={() => Linking.openURL(item?.videoUrl)}
          style={styles.fallbackPlayer}>
          <Text
            style={{
              color: colors.primary,
              fontSize: sizes.body,
              fontFamily: fontFamily.medium,
            }}>
            Watch on YouTube
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.infoBox}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: sizes.subheading,
              fontFamily: fontFamily.semiBold,
            },
          ]}>
          {item?.title}
        </Text>
        <Text
          style={[
            styles.meta,
            {
              fontSize: sizes.body,
              color: colors.text,
              fontFamily: fontFamily.medium,
            },
          ]}>
          {item?.category_name} • {item?.subCategory_name}
        </Text>
      </View>
    </View>
  );
});

export default memo(VideoCard);

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 15,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  fallbackPlayer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  linkText: {},
  infoBox: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    marginTop: 4,
  },
});

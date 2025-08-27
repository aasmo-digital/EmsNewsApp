import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';

const MediaRenderer = ({url, style}: any) => {
  const isVideo = url?.match(/\.(mp4|mov|mkv|avi|webm)$/i); // check extension se

  return (
    <View style={[styles.container, style]}>
      {isVideo ? (
        <Video
          source={{uri: url}}
          style={[styles.media, style]}
          resizeMode="cover"
          repeat
          muted={true} // audio off
          paused={true} // autoplay
        />
      ) : (
        <Image source={{uri: url}} style={[styles.media, style]} />
      )}
    </View>
  );
};

export default memo(MediaRenderer);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250, // apne hisaab se adjust karo
    borderRadius: 12,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: '100%',
  },
});

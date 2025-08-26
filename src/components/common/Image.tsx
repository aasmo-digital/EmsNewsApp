import {memo} from 'react';
import FastImage from 'react-native-fast-image';

const Image = ({style, source}: any) => (
  <FastImage
    style={style}
    source={source}
    resizeMode={FastImage.resizeMode.cover}
  />
);

export default memo(Image);

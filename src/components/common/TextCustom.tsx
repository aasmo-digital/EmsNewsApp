import {View, Text} from 'react-native';
import React from 'react';

const TextCustom = ({style,label}) => {
  return (
    <View>
      <Text allowFontScaling={false} style={style}>
         {label}
      </Text>
    </View>
  );
};

export default TextCustom;

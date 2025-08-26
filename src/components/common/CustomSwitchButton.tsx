import React, {memo, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';
import color from '../../theme/color';

type Props = {
  isOn?: boolean;
  onToggle?: (val: boolean) => void;
};

const CustomSwitchButton = ({isOn = false, onToggle}: Props) => {
  const [enabled, setEnabled] = useState(isOn);
  const animValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  const toggleSwitch = () => {
    const toValue = enabled ? 0 : 1;

    Animated.timing(animValue, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setEnabled(!enabled);
    if (onToggle) {
      onToggle(!enabled);
    }
  };

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  const bgColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', color.green],
  });

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <Animated.View
        style={[styles.switchContainer, {backgroundColor: bgColor}]}>
        <Animated.View style={[styles.circle, {transform: [{translateX}]}]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 50,
    height: 30,
    borderRadius: 20,
    padding: 2,
    justifyContent: 'center',
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
});

export default memo(CustomSwitchButton);

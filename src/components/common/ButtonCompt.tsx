import React, {memo} from 'react';
import {
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  View,
  ImageProps,
  StyleSheet,
} from 'react-native';
import color from '../../theme/color';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';

type ButtonComptProps = {
  onPress?: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isOutline?: any;
  rightImage?: React.ReactNode;
};

const ButtonCompt: React.FC<ButtonComptProps> = ({
  onPress,
  isLoading = false,
  title,
  style,
  textStyle,
  isOutline,
  rightImage,
}) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: isOutline ? colors.btnbg : colors.btnbg,
          paddingVertical: 15,
          paddingHorizontal: 10,
          alignItems: isOutline ? undefined : 'center',
          borderRadius: 10,
          opacity: isLoading ? 0.8 : 1,
          width: '100%',
          shadowColor: colors.text,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 5,
          borderWidth: isOutline ? 0.5 : 0,
        },
        style,
      ]}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color={color.white} />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: isOutline ? 'space-between' : 'center',
          }}>
          <Text
            style={[
              {color: isOutline ? colors.text : colors.text},
              {
                fontSize: sizes.subheading,
                color: colors.background,
                fontFamily: fontFamily.semiBold,
              },
              textStyle,
            ]}>
            {title}
          </Text>
          {rightImage && <View style={styles.leftIcon}>{rightImage}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default memo(ButtonCompt);
const styles = StyleSheet.create({
  leftIcon: {
    marginRight: 8,
  },
});

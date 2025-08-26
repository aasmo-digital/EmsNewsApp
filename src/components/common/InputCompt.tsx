import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import color from '../../theme/color';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';

interface InputComptProps extends TextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  secureTextEntry?: boolean;
}

const InputCompt: React.FC<InputComptProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  containerStyle,
  inputStyle,
  labelStyle,
  leftIcon,
  rightIcon,
  error,
  onFocus,
  onBlur,
  secureTextEntry,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const borderColor = error ? '#ff4d4f' : isFocused ? '#007bff' : '#ccc';

  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            labelStyle,
            {
              fontSize: sizes.subheading,
              color: colors.text,
              fontFamily: fontFamily.medium,
            },
          ]}>
          {label}
        </Text>
      )}

      <View style={[styles.inputWrapper, {borderColor}]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            inputStyle,
            leftIcon && {paddingLeft: 0},
            {
              fontSize: sizes.subheading,
              color: colors.text,
              fontFamily: fontFamily.medium,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={color.gray}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          {...rest}
        />
        {rightIcon && <View style={styles.leftIcon}>{rightIcon}</View>}
      </View>

      {!!error && (
        <Text
          style={[
            styles.errorText,
            {
              fontSize: sizes.body,
              color: color.warning,
              fontFamily: fontFamily.regular,
            },
          ]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default InputCompt;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    letterSpacing: 0.5,
  },
  errorText: {
    marginTop: 5,
    letterSpacing: 1,
  },
});

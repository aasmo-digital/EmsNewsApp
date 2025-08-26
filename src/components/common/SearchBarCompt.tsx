import React, {memo, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';

interface SearchBarProps extends TextInputProps {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const SearchBarCompt: React.FC<SearchBarProps> = ({
  containerStyle,
  inputStyle,
  value,
  onChangeText,
  ...props
}) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

  const handleClear = () => {
    if (onChangeText) {
      onChangeText('');
    }
  };

  return (
    <View
      style={[styles.container, containerStyle, {borderColor: colors.text}]}>
      <Icon name="search" size={20} color="#666" style={styles.icon} />
      <TextInput
        placeholder={t('search_placeholder_text')}
        placeholderTextColor={colors.text}
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          inputStyle,
          {
            fontSize: sizes.subheading,
            color: colors.text,
            fontFamily: fontFamily.medium,
          },
        ]}
        {...props}
      />
      {!!value && (
        <TouchableOpacity onPress={handleClear}>
          <Icon
            name="close-circle"
            size={20}
            color="#999"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(SearchBarCompt);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.3,
  },
  icon: {
    marginHorizontal: 4,
  },
  input: {
    flex: 1,
  },
});

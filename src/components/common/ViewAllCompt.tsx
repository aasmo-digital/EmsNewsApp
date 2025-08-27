import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';

const ViewAllCompt = ({title, onPress, style, showviewAll}: any) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  return (
    <View style={[styles.header, style]}>
      <Text
        numberOfLines={1}
        style={{
          fontSize: sizes.subheading,
          color: colors.text,
          fontFamily: fontFamily.semiBold,
          opacity: 0.8,
          letterSpacing: 0.5,
          flex: 1,
          marginRight: 10,
        }}>
        {title}
      </Text>

      {showviewAll && (
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              fontSize: sizes.body,
              color: colors.primary,
              fontFamily: fontFamily.medium,
              letterSpacing: 0.5,
            }}>
            {t('view_all_text')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(ViewAllCompt);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 16,
    marginVertical: 5,
  },
});

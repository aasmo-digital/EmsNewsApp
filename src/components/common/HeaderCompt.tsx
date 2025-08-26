import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../../theme/color';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';

interface HeaderComptProps {
  title?: string;
  textColor?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  showBackButton?: boolean;
}

const HeaderCompt: React.FC<HeaderComptProps> = ({
  title = 'Header',
  textColor,
  style,
  titleStyle,
  showBackButton = true,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  return (
    <View style={[styles.container, style]}>
      {showBackButton && (
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon
            name="chevron-back"
            size={24}
            color={textColor || colors.text}
          />
        </TouchableOpacity>
      )}
      <Text
        style={[
          {
            color: textColor || colors.text,
            fontSize: sizes.subheading,
            fontFamily: fontFamily.semiBold,
          },
          titleStyle,
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default HeaderCompt;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
});

// components/CustomTabBar.tsx
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import color from '../../theme/color';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName = '';
        switch (route.name) {
          case 'Home':
            iconName = isFocused ? 'home' : 'home-outline';
            break;
          case 'Explore':
            iconName = isFocused ? 'search' : 'search-outline';
            break;
          case 'Coverage':
            iconName = isFocused ? 'map' : 'map-outline';
            break;
          case 'Saved':
            iconName = isFocused ? 'bookmark' : 'bookmark-outline';
            break;
          case 'Profile':
            iconName = isFocused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'ellipse';
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={styles.tab}>
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? colors.primary : 'gray'}
            />
            <Text
              style={[
                styles.label,
                {
                  color: isFocused ? colors.text : 'gray',
                  fontSize: sizes.body,
                  fontFamily: fontFamily.regular,
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    elevation: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 2,
  },
});

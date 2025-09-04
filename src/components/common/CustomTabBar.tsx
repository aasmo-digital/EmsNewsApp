// components/CustomTabBar.tsx
import React, {memo} from 'react';
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

        // Map route names to translation keys
        const translationKeys: Record<string, string> = {
          Home: 'home_text',
          // Explore: 'explore_text',
          EmsVideos: 'video_text',
          Reel: 'reel_text',
          Directory: 'directory_text',
          More: 'more_text',
        };

        const label = t(translationKeys[route.name] || route.name);

        let iconName = '';
        switch (route.name) {
          case 'Home':
            iconName = isFocused ? 'home' : 'home-outline';
            break;
          // case 'Explore':
          //   iconName = isFocused ? 'search' : 'search-outline';
          //   break;

          case 'EmsVideos':
            iconName = isFocused ? 'videocam' : 'videocam-outline';
            break;
          case 'Reel':
            iconName = isFocused ? 'play-circle' : 'play-circle-outline';
            break;
          // case 'Saved':
          //   iconName = isFocused ? 'bookmark' : 'bookmark-outline';
          //   break;

          case 'Directory':
            iconName = isFocused ? 'calendar-clear' : 'calendar-clear-outline';
            break;
          case 'More':
            // iconName = isFocused ? 'person' : 'person-outline';
            iconName = isFocused ? 'menu' : 'menu';
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
                  color: isFocused ? colors.primary : 'gray',
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

export default memo(CustomTabBar);

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

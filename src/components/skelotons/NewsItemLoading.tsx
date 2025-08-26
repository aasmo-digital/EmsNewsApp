import React, {memo, useEffect} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  View,
  // TypeScript types ke liye
  StyleProp,
  ViewStyle,
} from 'react-native';

// SkeletonPulse ko ek reusable component banaya gaya hai
const SkeletonPulse = ({style}: {style: StyleProp<ViewStyle>}) => {
  // Animated value jo 0.3 se 1 ke beech pulse karega
  const opacity = new Animated.Value(0.5);

  useEffect(() => {
    // Loop animation jo hamesha chalti rahegi
    Animated.loop(
      Animated.sequence([
        // Opacity ko 1 tak le jaao
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600, // Thoda fast
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true, // Performance ke liye zaroori
        }),
        // Opacity ko wapas 0.5 tak le aao
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]); // Dependency array mein 'opacity'

  // Animated.View ka istemal karke opacity ko apply karo
  return <Animated.View style={[style, {opacity}]} />;
};

// Main Loading Component
const NewsItemLoading = () => {
  // renderItem function ko FlatList ke bahar define karna ek acchi practice hai
  const renderSkeletonItem = () => (
    <View style={styles.itemContainer}>
      <SkeletonPulse style={styles.skeletonItem} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6]} // 5 items dikhana behtar lagega
        renderItem={renderSkeletonItem}
        keyExtractor={item => item.toString()}
        horizontal={true} // List ko horizontal banaya
        showsHorizontalScrollIndicator={false} // Scroll bar ko chupaya
      />
    </View>
  );
};

// memo ka use karna bilkul sahi hai, yeh unnecessary re-renders ko rokta hai
export default memo(NewsItemLoading);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8, // Upar-neeche thoda space
  },
  itemContainer: {
    // Har item ke liye container jismein margin hai
    marginHorizontal: 4,
  },
  skeletonItem: {
    // Asli skeleton ka style
    width: 300,
    height: 200,

    borderRadius: 20, // Sahi spelling: borderRadius
    backgroundColor: '#f2f2f2',
    // Agar light theme hai toh use karein: '#e0e0e0'
  },
});

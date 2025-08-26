import React, {memo, useEffect} from 'react';
import {Animated, Easing, FlatList, StyleSheet, View} from 'react-native';
import {useTheme} from '../../context/ThemeContext';

const SkeletonPulse = ({style}: {style: any}) => {
  const opacity = new Animated.Value(0.5);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return <Animated.View style={[style, {opacity, backgroundColor: '#ccc'}]} />;
};

const NewsCardSkeleton = () => {
  const {colors} = useTheme();
  const renderSkeletonItem = () => (
    <View style={[styles.card, {backgroundColor: colors.card}]}>
      {/* Left Side (Text placeholders) */}
      <View style={{flex: 1, marginRight: 8}}>
        <SkeletonPulse
          style={[
            styles.skeletonBox,
            {width: '70%', height: 16, marginBottom: 8},
          ]}
        />
        <SkeletonPulse
          style={[
            styles.skeletonBox,
            {width: '90%', height: 14, marginBottom: 4},
          ]}
        />
        <SkeletonPulse
          style={[
            styles.skeletonBox,
            {width: '80%', height: 14, marginBottom: 12},
          ]}
        />

        {/* Interaction bar placeholders */}
        <View style={styles.interactionBar}>
          <SkeletonPulse style={[styles.circle, {marginRight: 24}]} />
          <SkeletonPulse style={[styles.circle, {marginRight: 24}]} />
          <SkeletonPulse style={styles.circle} />
        </View>
      </View>

      {/* Right Side (Image placeholder) */}
      <SkeletonPulse style={styles.image} />
    </View>
  );

  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      renderItem={renderSkeletonItem}
      keyExtractor={item => item.toString()}
      contentContainerStyle={{paddingVertical: 8}}
    />
  );
};

export default memo(NewsCardSkeleton);

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    flex: 1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  skeletonBox: {
    borderRadius: 6,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  interactionBar: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
});

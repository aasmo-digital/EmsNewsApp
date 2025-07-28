import React, {memo} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import color from '../../../theme/color';

const SkeletonPulse = ({style}: {style: any}) => {
  const opacity = new Animated.Value(0.3);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return <Animated.View style={[style, {opacity}]} />;
};

const DemoSkelaton = () => {
  return (
    <View style={styles.card}>
      {/* Left Text Section */}
      <View style={[styles.textContainer, {flex: 1}]}>
        <SkeletonPulse style={styles.titleLine} />
        <View style={{flexDirection: 'row', gap: 8}}>
          <SkeletonPulse style={styles.labelLine} />
          <SkeletonPulse style={styles.valueLine} />
        </View>
      </View>

      {/* Right Date/Time Section */}
      <View style={styles.textContainer}>
        <SkeletonPulse style={styles.infoLine} />
        <SkeletonPulse style={styles.infoLine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.whiteLight,
    borderRadius: 12,
    flexDirection: 'row',
    padding: 14,
    flex: 1,
    shadowColor: color.secondaryBG,
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  titleLine: {
    width: 150,
    height: 16,
    backgroundColor: color.lightgray,
    borderRadius: 6,
  },
  labelLine: {
    width: 70,
    height: 14,
    backgroundColor: color.lightgray,
    borderRadius: 6,
  },
  valueLine: {
    width: 60,
    height: 14,
    backgroundColor: color.lightgray,
    borderRadius: 6,
  },
  infoLine: {
    width: 100,
    height: 14,
    backgroundColor: color.lightgray,
    borderRadius: 6,
  },
});

export default memo(DemoSkelaton);

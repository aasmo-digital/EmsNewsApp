import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

const { width } = Dimensions.get('window');

interface CustomSliderProps {
  images: string[];
  sliderHeight?: number;
  dotColor?: string;
  inactiveDotColor?: string;
  autoplay?: boolean;
  delay?: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  images,
  sliderHeight = 200,
  dotColor = '#e53935',
  inactiveDotColor = '#90A4AE',
  autoplay = true,
  delay = 3000,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<string>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (autoplay) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }, delay);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, images.length, autoplay, delay]);

  const renderItem = ({ item }: { item: string }) => (
    <Image
      source={{ uri: item }}
      style={{ width, height: sliderHeight, resizeMode: 'cover' }}
    />
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={{ height: sliderHeight }}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
      />
      {/* Pagination Dots */}
      <View style={styles.dotContainer}>
        {images.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: currentIndex === i ? dotColor : inactiveDotColor,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default CustomSlider;

import React, {useMemo, forwardRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {useFontSize} from '../../../context/FontSizeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {useTheme} from '../../../context/ThemeContext';

// यह मानते हुए कि आपके पास ये वेरिएबल्स हैं

const TagsModal = forwardRef((props, ref) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

  const newsTags = [
    'Breaking News',
    'Politics',
    'Sports',
    'Entertainment',
    'Technology',
    'Business',
    'Health',
    'Science',
    'Travel',
    'World',
  ];

  // बॉटम शीट कितनी ऊंचाई तक खुलेगी, यह परिभाषित करता है
  const snapPoints = useMemo(() => ['35%', '60%'], []);

  return (
    <BottomSheetModal
      ref={ref}
      index={0} // शुरू में पहले snap point पर खुलेगा
      snapPoints={snapPoints}
      handleIndicatorStyle={{backgroundColor: colors.text}}
      backgroundStyle={{
        backgroundColor: colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: colors.text,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <BottomSheetView style={styles.contentContainer}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: sizes.body,
              fontFamily: fontFamily.medium,
            },
          ]}>
          Explore Tags
        </Text>
        <View style={styles.tagsWrapper}>
          {newsTags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tagContainer,
                {backgroundColor: colors.background, shadowColor: colors.primary},
              ]}>
              <Text
                style={{
                  color: colors.text,
                  fontFamily: fontFamily.medium,
                  fontSize: sizes.body,
                }}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default TagsModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tagContainer: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 5,
     shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
});

import React, {useMemo, forwardRef, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';

// Sample data for comments
const commentsData = [
  {id: '1', user: 'Anjali Sharma', text: 'This is a very insightful article!'},
  {id: '2', user: 'Rohan Verma', text: 'Great points, I completely agree.'},
  {
    id: '3',
    user: 'Priya Singh',
    text: 'Could you elaborate on the second point?',
  },
  {
    id: '4',
    user: 'Sameer Khan',
    text: 'Thanks for sharing this valuable information.',
  },
];

const CommentsSheet = forwardRef((props, ref) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  // Defines how high the bottom sheet will open.
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // Renders each comment item
  const renderComment = ({item}) => (
    <View style={[styles.commentContainer, {borderBottomColor: colors.border}]}>
      <Text
        style={[
          styles.commentUser,
          {color: colors.primary, fontFamily: fontFamily.bold},
        ]}>
        {item.user}
      </Text>
      <Text
        style={[
          styles.commentText,
          {
            color: colors.text,
            fontSize: sizes.body,
            fontFamily: fontFamily.regular,
          },
        ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={1} // Opens at the second snap point initially
      snapPoints={snapPoints}
      handleIndicatorStyle={{backgroundColor: colors.text}}
      backgroundStyle={{
        backgroundColor: colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60} // Adjust this value if needed
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                fontSize: sizes.title,
                fontFamily: fontFamily.bold,
              },
            ]}>
            {t('Comments')}
          </Text>

          {/* List of Comments */}
          <FlatList
            data={commentsData}
            renderItem={renderComment}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingBottom: 20}}
            showsVerticalScrollIndicator={false}
          />

          {/* Input for new comment */}
          <View style={[styles.inputContainer, {borderColor: colors.border}]}>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  fontSize: sizes.body,
                  fontFamily: fontFamily.regular,
                },
              ]}
              placeholder={t('Add a comment...')}
              placeholderTextColor={colors.placeholder}
            />
            <TouchableOpacity
              style={[styles.sendButton, {backgroundColor: colors.primary}]}>
              <Text
                style={[
                  styles.sendButtonText,
                  {color: colors.background, fontFamily: fontFamily.medium},
                ]}>
                {t('Post')}
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </KeyboardAvoidingView>
    </BottomSheetModal>
  );
});

export default memo(CommentsSheet);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  commentContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  commentUser: {
    fontSize: 16,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 'auto', // Pushes the input to the bottom
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f0f0f0', // A slightly different background for input
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    fontSize: 16,
  },
});

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather icons
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {mockCommentsData} from './const';
import styles from './comment.style';
import {useRoute} from '@react-navigation/native';
import {getTimeAgo} from '../../../utility/functions/toast';

// --- 2. THE REUSABLE COMMENT ITEM COMPONENT ---
const CommentItem = ({item, isReply = false}) => {
  const [showReplies, setShowReplies] = useState(false);

  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

  return (
    <View style={[styles.commentContainer, isReply && styles.replyContainer]}>
      <Image source={{uri: item?.user?.profileImage}} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text
          style={{
            color: colors.text,
            fontFamily: fontFamily.medium,
            fontSize: sizes.subheading,
            textTransform: 'capitalize',
          }}>
          {item?.user?.name}
        </Text>
        <Text
          style={[
            styles.commentText,
            {
              color: colors.text,
              fontFamily: fontFamily.regular,
              fontSize: sizes.body,
            },
          ]}>
          {item?.text}
        </Text>
        <View style={styles.metaContainer}>
          <Text
            style={{
              color: colors.text,
              fontFamily: fontFamily.medium,
              fontSize: sizes.body,
              opacity: 0.8,
            }}>
            {getTimeAgo(item?.createdAt)}
          </Text>
          {/* <TouchableOpacity style={styles.likesContainer}>
            <Icon name="heart" size={14} color="#888" />
            <Text
              style={{
                color: colors.text,
                fontFamily: fontFamily.medium,
                fontSize: sizes.body,
                opacity: 0.8,
              }}>
              {' '}
              {item?.likes} likes
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity>
            <Text
              style={{
                color: colors.text,
                fontFamily: fontFamily.medium,
                fontSize: sizes.body,
                opacity: 0.8,
              }}>
              reply
            </Text>
          </TouchableOpacity> */}
        </View>

        {/* Replies Section */}
        {item?.replies && item?.replies.length > 0 && (
          <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
            <Text
              style={[
                styles.seeMore,
                {
                  fontSize: sizes.body,
                  color: colors.text,
                  fontFamily: fontFamily.medium,
                },
              ]}>
              {showReplies
                ? 'Hide replies'
                : `See more (${item?.replies.length})`}
            </Text>
          </TouchableOpacity>
        )}

        {showReplies && item?.replies && (
          <View style={styles.repliesList}>
            {item?.replies.map(reply => (
              <CommentItem key={reply.id} item={reply} isReply={true} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

// --- 3. THE MAIN SCREEN COMPONENT ---
const CommentsScreen = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const route = useRoute();
  const allComments = route?.params?.comments;

  // console.log('---------------', route?.params?.comments);

  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  // Fetch initial comments
  useEffect(() => {
    setTimeout(() => {
      setComments(mockCommentsData);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePostComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObject = {
      id: Math.random().toString(), // Use a better ID in a real app
      author: 'You', // Get current user's name
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg', // Current user's avatar
      text: newComment.trim(),
      timestamp: 'Just now',
      likes: 0,
      replies: [],
    };

    // Add new comment to the top of the list
    setComments([newCommentObject, ...comments]);
    setNewComment('');
    Keyboard.dismiss();
  };

  const renderItem = ({item}) => <CommentItem item={item} />;

  return (
    <PageContainer style={{paddingTop: 25}}>
      <SafeAreaView style={styles.safeArea}>
        <HeaderCompt title="Comments" />
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{flex: 1, backgroundColor: colors.background}}
          />
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
            <>
              <FlatList
                data={allComments}
                renderItem={renderItem}
                keyExtractor={item => item?.id}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <Text
                    style={{
                      fontSize: sizes.subheading,
                      color: colors.text,
                      fontFamily: fontFamily.regular,
                      textAlign: 'center',
                      marginTop: 200,
                    }}>
                    No Comments Found
                  </Text>
                )}
              />
            </>

            {/* Comment Input Box */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    fontSize: sizes.body,
                    color: colors.text,
                    fontFamily: fontFamily.regular,
                  },
                ]}
                placeholder="Type your comment"
                value={newComment}
                onChangeText={setNewComment}
                placeholderTextColor={colors.text}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handlePostComment}>
                <Icon name="send" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    </PageContainer>
  );
};

export default CommentsScreen;

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';

import {getTimeAgo} from '../../../utility/functions/toast';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import styles from '../CommentsScreen/comment.style';
import {showErrorToast} from '../../../utility/HelperFuntions';

// --- TYPES ---
interface User {
  id: string;
  name: string;
  profileImage: string;
}

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  user: User;
  replies?: Comment[];
}

// --- COMMENT ITEM COMPONENT ---
const CommentItem = ({
  item,
  isReply = false,
}: {
  item: Comment;
  isReply?: boolean;
}) => {
  // const [showReplies, setShowReplies] = useState(false);

  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();

  return (
    <View style={[styles.commentContainer, isReply && styles.replyContainer]}>
      <Image
        source={{
          uri: item?.user?.profileImage
            ? item.user.profileImage
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s',
        }}
        style={styles.avatar}
      />

      <View style={styles.commentContent}>
        <Text
          style={{
            color: colors.text,
            fontFamily: fontFamily.medium,
            fontSize: sizes.subheading,
            textTransform: 'capitalize',
          }}>
          {item.user.name}
        </Text>

        <Text
          style={{
            color: colors.text,
            fontFamily: fontFamily.regular,
            fontSize: sizes.body,
            marginVertical: 2,
          }}>
          {item.text}
        </Text>

        <View style={styles.metaContainer}>
          <Text
            style={{
              color: colors.text,
              fontFamily: fontFamily.medium,
              fontSize: sizes.body,
              opacity: 0.6,
            }}>
            {getTimeAgo(item.createdAt)}
          </Text>
        </View>

        {/* {item.replies && item.replies.length > 0 && (
          <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
            <Text
              style={{
                fontSize: sizes.body,
                color: colors.primary,
                fontFamily: fontFamily.medium,
                marginTop: 4,
              }}>
              {showReplies
                ? 'Hide replies'
                : `View replies (${item.replies.length})`}
            </Text>
          </TouchableOpacity>
        )} */}

        {/* {showReplies && item.replies && (
          <View style={styles.repliesList}>
            {item.replies.map(reply => (
              <CommentItem key={reply.id} item={reply} isReply={true} />
            ))}
          </View>
        )} */}
      </View>
    </View>
  );
};

// --- MAIN SCREEN ---
const ShortsComments = () => {
  const route = useRoute<any>();
  const shortsID = route.params?.item?._id;

  console.log('------------------------dbwj-----------', shortsID);

  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();
  const token = useSelector((state: any) => state.UserData?.token);

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setCommentsLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getpostCommentByShortId + shortsID + '/comment',
        method: 'GET',
        token: token,
      });

      // console.log('----------gfhjdsfbkefbeuf------------', response);
      if (response?.success) {
        setComments(response.data);
      } else {
        setComments([]);
      }
    } catch (error: any) {
      console.error('Fetch Comments Error:', error.message);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    Keyboard.dismiss();

    const tempComment: Comment = {
      id: Date.now().toString(),
      text: newComment.trim(),
      createdAt: new Date().toISOString(),
      user: {
        id: 'me',
        name: 'You',
        profileImage: 'https://i.pravatar.cc/50',
      },
      replies: [],
    };

    setComments(prev => [tempComment, ...prev]);
    setNewComment('');
    setSubmitting(true);

    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getpostCommentByShortId + shortsID + '/comment',
        method: 'POST',
        request: {text: newComment.trim()},
        token: token,
      });
      if (response?.success) {
        fetchComments();
      } else {
        showErrorToast(response?.message);
      }
    } catch (error: any) {
      console.error('Add Comment Error:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer style={{paddingTop: 25}}>
      <SafeAreaView style={styles.safeArea}>
        <HeaderCompt title={t('comments')} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
          <>
            {commentsLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : (
              <FlatList
                data={comments}
                renderItem={({item}) => <CommentItem item={item} />}
                keyExtractor={item => item.id}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <Text
                    style={{
                      fontSize: sizes.subheading,
                      color: colors.text,
                      fontFamily: fontFamily.regular,
                      textAlign: 'center',
                      marginTop: 150,
                    }}>
                    {t('no_comments_found')}
                  </Text>
                )}
              />
            )}
          </>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {/* Comment Input */}
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
          placeholder={t('type_your_comments')}
          value={newComment}
          onChangeText={setNewComment}
          placeholderTextColor={colors.text}
        />
        <TouchableOpacity
          style={[styles.sendButton, submitting && {opacity: 0.6}]}
          onPress={handlePostComment}
          disabled={submitting}>
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Icon name="send" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </PageContainer>
  );
};

export default ShortsComments;

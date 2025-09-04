import React, {useState} from 'react';
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
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {useRoute} from '@react-navigation/native';
import {getTimeAgo} from '../../../utility/functions/toast';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import styles from './comment.style';
import {useSelector} from 'react-redux';

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
  const [showReplies, setShowReplies] = useState(false);

  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();

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
          style={{
            color: colors.text,
            fontFamily: fontFamily.regular,
            fontSize: sizes.body,
            marginVertical: 2,
          }}>
          {item?.text}
        </Text>

        <View style={styles.metaContainer}>
          <Text
            style={{
              color: colors.text,
              fontFamily: fontFamily.medium,
              fontSize: sizes.body,
              opacity: 0.6,
            }}>
            {getTimeAgo(item?.createdAt)}
          </Text>
        </View>

        {/* Replies Section */}
        {item?.replies && item?.replies.length > 0 && (
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
        )}

        {showReplies && item?.replies && (
          <View style={styles.repliesList}>
            {item.replies.map(reply => (
              <CommentItem key={reply.id} item={reply} isReply={true} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

// --- MAIN SCREEN ---
const CommentsScreen = () => {
  const route = useRoute<any>();
  const initialComments: Comment[] = route?.params?.comments || [];

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const token = useSelector(state => state.UserData?.token);

  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();

  // --- HANDLE COMMENT POST ---
  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    Keyboard.dismiss();

    const tempComment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      createdAt: new Date().toISOString(),
      user: {
        id: 'me',
        name: 'You',
        profileImage: 'https://i.pravatar.cc/50',
      },
      replies: [],
    };

    setComments([tempComment, ...comments]);
    setNewComment('');
    setSubmitting(true);

    try {
      const response = await ApiRequest({
        BaseUrl:
          ApiRoutes.addNewsComment + '6890ad36179f17a2040f0e94' + '/comment',
        method: 'POST',
        request: {text: newComment},
        token: token,
      });

      console.log('---------------', response);
    } catch (error: any) {
      console.error('Add Comment Error:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer style={{paddingTop: 25}}>
      <SafeAreaView style={styles.safeArea}>
        <HeaderCompt title="Comments" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
          <>
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
                  No Comments Found
                </Text>
              )}
            />

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
                placeholder="Type your comment..."
                value={newComment}
                onChangeText={setNewComment}
                placeholderTextColor={colors.text + '99'}
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
          </>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PageContainer>
  );
};

export default CommentsScreen;

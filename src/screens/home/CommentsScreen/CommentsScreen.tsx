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
import { HeaderCompt } from '../../../components/componentsIndex';

// --- 1. MOCK DATA (In a real app, this comes from your API) ---
const mockCommentsData = [
  {
    id: '201',
    author: 'राजेश कुमार',
    avatarUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
    text: 'वाह! क्या शानदार कदम है। मोदी जी के नेतृत्व में देश सच में बदल रहा है। अब चीन और अमेरिका को भी टक्कर देंगे। जय हिंद! 🇮🇳',
    timestamp: '15 मिनट पहले',
    likes: 256,
    replies: [],
  },
  {
    id: '202',
    author: 'अंजलि सिंह',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'कहने में तो सब अच्छा लगता है, पर क्या यह सुरक्षित है? पहले से ही इतने सारे पेमेंट ऐप्स हैं, उनमें फ्रॉड होते रहते हैं। सरकार हमारी प्राइवेसी की गारंटी लेगी क्या?',
    timestamp: '1 घंटा पहले',
    likes: 182,
    replies: [
      {
        id: '202a',
        author: 'विक्रम चौधरी',
        avatarUrl: 'https://randomuser.me/api/portraits/men/71.jpg',
        text: '@अंजलि सिंह आपकी बात सही है। जब तक डेटा प्रोटेक्शन का कोई मज़बूत कानून नहीं बनता, तब तक भरोसा करना मुश्किल है।',
        timestamp: '45 मिनट पहले',
        likes: 95,
        replies: [],
      },
      {
        id: '202b',
        author: 'राष्ट्रवादी पवन',
        avatarUrl: 'https://randomuser.me/api/portraits/men/72.jpg',
        text: 'अरे मैडम, हर चीज़ में négativity क्यों? देश आगे बढ़ रहा है तो आपको दिक्कत हो रही है। यह ब्लॉकचेन पर आधारित है, सबसे ज़्यादा सुरक्षित है।',
        timestamp: '30 मिनट पहले',
        likes: 65,
        replies: [],
      },
    ],
  },
  {
    id: '203',
    author: 'सुनीता देवी',
    avatarUrl: 'https://randomuser.me/api/portraits/women/52.jpg',
    text: 'बहुत अच्छा काम है। पर क्या कोई बताएगा कि इसको गाँव में कैसे इस्तेमाल करेंगे? वहां तो इंटरनेट भी ठीक से नहीं चलता।',
    timestamp: '3 घंटे पहले',
    likes: 112,
    replies: [
        {
        id: '203a',
        author: 'एक जानकार',
        avatarUrl: 'https://randomuser.me/api/portraits/men/53.jpg',
        text: 'जी, रिपोर्ट्स के अनुसार इसे कुछ हद तक ऑफलाइन भी इस्तेमाल किया जा सकेगा, इसी समस्या के समाधान के लिए।',
        timestamp: '2 घंटे पहले',
        likes: 78,
        replies: [],
      },
    ]
  },
  {
    id: '204',
    author: 'रोहित (गेमर)',
    avatarUrl: 'https://randomuser.me/api/portraits/men/88.jpg',
    text: 'UPI के होते हुए इसकी क्या ज़रूरत थी? जब तक इसमें कोई बढ़िया कैशबैक ऑफर नहीं होगा, तब तक तो मैं Paytm और GPay ही यूज़ करूँगा।',
    timestamp: '5 घंटे पहले',
    likes: 205,
    replies: [],
  },
  {
    id: '205',
    author: 'चंचल शर्मा',
    avatarUrl: 'https://randomuser.me/api/portraits/women/90.jpg',
    text: 'इसका लोगो तो बिलकुल कैंडी क्रश जैसा लग रहा है। 😂',
    timestamp: '6 घंटे पहले',
    likes: 543,
    replies: [
        {
        id: '205a',
        author: 'समीर',
        avatarUrl: 'https://randomuser.me/api/portraits/men/91.jpg',
        text: 'हाहाहा, सही कहा! 😂 अब तो डाउनलोड करना ही पड़ेगा।',
        timestamp: '5 घंटे पहले',
        likes: 120,
        replies: [],
      },
    ]
  },
];

// --- 2. THE REUSABLE COMMENT ITEM COMPONENT ---
const CommentItem = ({item, isReply = false}) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <View style={[styles.commentContainer, isReply && styles.replyContainer]}>
      <Image source={{uri: item.avatarUrl}} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>{item.timestamp}</Text>
          <TouchableOpacity style={styles.likesContainer}>
            <Icon name="heart" size={14} color="#888" />
            <Text style={styles.metaText}> {item.likes} likes</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.replyText}>reply</Text>
          </TouchableOpacity>
        </View>

        {/* Replies Section */}
        {item.replies && item.replies.length > 0 && (
          <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
            <Text style={styles.seeMore}>
              {showReplies
                ? 'Hide replies'
                : `See more (${item.replies.length})`}
            </Text>
          </TouchableOpacity>
        )}

        {showReplies && item.replies && (
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

// --- 3. THE MAIN SCREEN COMPONENT ---
const CommentsScreen = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

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

  if (loading) {
    return <ActivityIndicator size="large" style={{flex: 1}} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderCompt title='Comments'/>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />

        {/* Comment Input Box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your comment"
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handlePostComment}>
            <Icon name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// --- 4. STYLES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  keyboardAvoidingView: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  commentContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 0,
  },
  replyContainer: {
    marginLeft: 20, // Indent replies
    paddingTop: 12,
    paddingLeft: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  author: {
    fontWeight: 'bold',
    color: '#333',
  },
  commentText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginTop: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#888',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  seeMore: {
    fontSize: 13,
    color: '#555',
    fontWeight: 'bold',
    marginTop: 10,
  },
  repliesList: {
    marginTop: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommentsScreen;

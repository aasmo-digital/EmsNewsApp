import {StyleSheet} from 'react-native';

// --- 4. STYLES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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

  commentText: {
    marginTop: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 16,
  },

  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  seeMore: {
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
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
   },
  input: {
    flex: 1,
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

export default styles;

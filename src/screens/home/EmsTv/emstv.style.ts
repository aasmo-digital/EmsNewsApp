import {StyleSheet} from 'react-native';

// --- STYLING ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark theme
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  errorText: {
    color: '#ff5555',
    fontSize: 16,
  },
  playerContainer: {
    width: '100%',
    aspectRatio: 16 / 9, // Standard video ratio
    backgroundColor: '#000',
  },
  videoPlayer: {
    ...StyleSheet.absoluteFillObject,
  },
  noVideoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noVideoText: {
    color: '#fff',
  },
  controlsContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  searchInput: {
    backgroundColor: '#282828',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  categoryScroller: {
    height: 40,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#333',
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  activeCategoryButton: {
    backgroundColor: '#007bff', // Active color
  },
  categoryText: {
    color: '#fff',
  },
  listContainer: {
    flex: 1,
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  activeChannelItem: {
    backgroundColor: '#2a2a2a',
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  channelLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 15,
  },
  channelName: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;

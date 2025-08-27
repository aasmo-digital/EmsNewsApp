import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 30,
  },

  bottomLink: {textAlign: 'center', marginTop: 30},
  imageContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 5,

    borderRadius: 15,
    padding: 6,
    borderWidth: 2,
  },
});

export default styles;

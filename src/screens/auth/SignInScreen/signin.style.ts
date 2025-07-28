import {StyleSheet} from 'react-native';
import color from '../../../theme/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
    marginTop: 100,
  },
  subtitle: {
    marginBottom: 30,
  },

  forgotLink: {textAlign: 'right', marginBottom: 20, opacity: 0.8},

  orText: {textAlign: 'center', marginVertical: 20, opacity: 0.8},
  socialButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  bottomLink: {  textAlign: 'center', marginTop: 30,opacity:0.8},
});

export default styles;

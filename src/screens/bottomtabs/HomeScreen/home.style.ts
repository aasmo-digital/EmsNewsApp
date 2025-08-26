import {StyleSheet} from 'react-native';
import color from '../../../theme/color';

const styles = StyleSheet.create({
  categoryList: {
    paddingHorizontal: 10,
    marginVertical: 5,
    marginTop: 10,
  },
  categoryButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: color.white,
    borderWidth: 0.5,
    borderColor: color.appColor,
  },
  categoryText: {
    color: '#000',
  },
  card: {
    width: 300,
    height: 200,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
  },
  title: {
    marginTop: 4,
  },
  description: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 5,
  },
  meta: {
    marginTop: 5,
    textTransform: 'capitalize',
  },
});

export default styles;

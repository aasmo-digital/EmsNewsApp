import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 5,
    width: '100%',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  tagContainer: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },

  newsTagsList: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  newsTagsButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },

  card: {
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 8,
  },
  title: {
    marginTop: 4,
    textTransform: 'capitalize',
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
  city: {
    opacity: 0.8,
  },
});

export default styles
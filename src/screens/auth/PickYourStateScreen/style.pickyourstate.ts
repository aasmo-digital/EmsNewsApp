import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
    marginTop: 30,
  },
  subtitle: {
    lineHeight: 22,
  },
  grid: {
    paddingBottom: 20,
  },
  stateButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    margin: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default styles;

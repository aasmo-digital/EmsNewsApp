import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import color from '../../theme/color';

const NewsCard = ({item}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('NewsDetail')}>
      <View style={{flex: 1, marginRight: 8}}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.meta} numberOfLines={2}>
          {item?.description}
        </Text>
      </View>

      <Image
        source={{
          uri: 'https://www.hindustantimes.com/ht-img/img/2025/07/22/550x309/Mumbai_train_blast_accused_1753162784155_1753162784325.jpg',
        }}
        style={styles.image}
      />
    </Pressable>
  );
};

export default memo(NewsCard);

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: color.white,
    flexDirection: 'row',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    color: color.black,
    fontWeight: 'bold',
    fontSize: 16,
    opacity: 0.8,
  },
  meta: {
    color: '#ccc',
    fontSize: 12,
  },
});

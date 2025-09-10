import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  ButtonCompt,
  HeaderCompt,
  PageContainer,
  SearchBarCompt,
} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {dummyData, popularServices, productData} from './const.data';

const Directory = () => {
  const {sizes, fontFamily} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  const renderGridItem = item => (
    <TouchableOpacity style={[styles.gridCard, {backgroundColor: colors.card}]}>
      <Image source={{uri: item.image}} style={styles.gridImage} />
      <Text
        style={[
          styles.gridTitle,
          {
            color: colors.text,
            fontFamily: fontFamily.medium,
            fontSize: sizes.body,
          },
        ]}>
        {item.title || item.name}
      </Text>
    </TouchableOpacity>
  );

  const GridList = ({data, title, onFooterPress}: any) => (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={({item}) => renderGridItem(item)}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={{padding: 16}}
        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 16}}
        ListHeaderComponent={
          <Text
            style={{
              textAlign: 'center',
              fontFamily: fontFamily.semiBold,
              fontSize: sizes.heading,
              color: colors.text,
              marginBottom: 16,
            }}>
            {title}
          </Text>
        }
        ListFooterComponent={
          <ButtonCompt title={t('view_all_text')} onPress={onFooterPress} />
        }
      />
    </View>
  );

  const renderListItem = ({item}: any) => (
    <View
      style={[
        styles.businessCard,
        {backgroundColor: colors.background, borderColor: colors.border},
      ]}>
      <Image
        source={{uri: item.image}}
        style={[styles.businessImage, {borderColor: colors.primary}]}
      />
      <View style={styles.infoContainer}>
        <Text
          style={{
            color: colors.primary,
            fontFamily: fontFamily.bold,
            fontSize: sizes.subheading,
            marginBottom: 4,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: colors.text,
            fontFamily: fontFamily.regular,
            fontSize: sizes.body,
            marginBottom: 4,
          }}>
          {item.location}
        </Text>
        <Text
          style={{
            color: colors.text,
            fontFamily: fontFamily.regular,
            fontSize: sizes.body * 0.9,
          }}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <PageContainer>
      <HeaderCompt title={t('directory_text')} />
      <SearchBarCompt />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <GridList
          data={popularServices}
          title="Popular Services in Indore"
          onFooterPress={() => Alert.alert('View All Services')}
        />
        <GridList
          data={productData}
          title="Popular Products in Indore"
          onFooterPress={() => Alert.alert('View All Products')}
        />
        <View style={{padding: 16}}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: fontFamily.semiBold,
              fontSize: sizes.heading,
              color: colors.text,
              marginBottom: 16,
            }}>
            Popular Business in Indore
          </Text>
          <FlatList
            data={dummyData}
            renderItem={renderListItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingBottom: 16}}
            ListFooterComponent={
              <ButtonCompt
                title={t('view_all_text')}
                onPress={() => Alert.alert('View All Businesses')}
              />
            }
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default Directory;

const styles = StyleSheet.create({
  gridCard: {
    alignItems: 'center',
    width: '30%',
  },
  gridImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  gridTitle: {
    textAlign: 'center',
  },
  businessCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: 'center',
  },
  businessImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
});

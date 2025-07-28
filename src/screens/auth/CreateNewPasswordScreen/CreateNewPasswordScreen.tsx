import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  ButtonCompt,
  InputCompt,
  PageContainer,
} from '../../../components/componentsIndex';
import imageIndex from '../../../assets/imageIndex';
import color from '../../../theme/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateNewPasswordScreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <PageContainer
      statusBarProps={{
        backgroundColor: 'transparent',
        barStyle: 'dark-content',
        translucent: true,
      }}>
      <ImageBackground
        source={imageIndex.bg}
        style={{flex: 1}}
        resizeMode="stretch">
        <View style={styles.container}>
          <Text style={styles.title}>{t('createNewPasswordTitle')}</Text>
          <Text style={styles.subtitle}>{t('createNewPasswordSubtitle')}</Text>

          <InputCompt
            label="New Password"
            placeholder={t('newPasswordPlaceholder')}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            leftIcon={<Icon name="lock-outline" size={20} color="#888" />}
          />

          <InputCompt
            label="Repeat Password"
            placeholder={t('repeatPasswordPlaceholder')}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            secureTextEntry
            leftIcon={<Icon name="lock-outline" size={20} color="#888" />}
          />

          <ButtonCompt
            title={t('continue')}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            isLoading={false}
            style={{marginTop: 20}}
            textStyle={{fontWeight: 'bold'}}
          />
        </View>
      </ImageBackground>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: color.appColor,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  bottomLink: {color: '#007BFF', textAlign: 'center', marginTop: 30},
});

export default CreateNewPasswordScreen;

import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  ButtonCompt,
  HeaderCompt,
  InputCompt,
  PageContainer,
} from '../../../components/componentsIndex';
import {useLanguage} from '../../../context/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Errors {
  oldPassword?: string;
  newPassword?: string;
  repeatPassword?: string;
}

const ChangePassword: React.FC<{navigation: any}> = ({navigation}) => {
  const {t} = useLanguage();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const handleSaveChanges = () => {
    const validationErrors: Errors = {};

    if (!oldPassword)
      validationErrors.oldPassword = t('error_old_password_required');
    if (!newPassword)
      validationErrors.newPassword = t('error_new_password_required');
    if (newPassword.length < 6)
      validationErrors.newPassword = t('error_password_short');
    if (newPassword !== repeatPassword)
      validationErrors.repeatPassword = t('error_password_mismatch');

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      Alert.alert(t('success'), t('password_changed_success'));
      console.log('API Call: Change password for user');
      // navigation.goBack();
    }
  };

  return (
    <PageContainer style={{paddingTop:25,}}>
      <View style={styles.container}>
        <HeaderCompt showBackButton title={t('change_password')} />
        <View style={styles.form}>
          <InputCompt
            label={t('old_password_text')}
            placeholder={t('old_password_text')}
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
            leftIcon={<Icon name="lock-outline" size={20} color="#888" />}
            error={errors.oldPassword}
          />
          <InputCompt
            label={t('newPasswordPlaceholder')}
            placeholder={t('newPasswordPlaceholder')}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            leftIcon={<Icon name="lock-outline" size={20} color="#888" />}
            error={errors.newPassword}
          />
          <InputCompt
            label={t('repeatPasswordPlaceholder')}
            placeholder={t('repeatPasswordPlaceholder')}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            secureTextEntry
            leftIcon={<Icon name="lock-outline" size={20} color="#888" />}
            error={errors.repeatPassword}
          />

          <ButtonCompt
            title={t('continue')}
            onPress={handleSaveChanges}
            isLoading={false}
          />
        </View>
      </View>
    </PageContainer>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});

// LanguageSelectorPopup.tsx
import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useLanguage} from '../../context/LanguageContext';
import {useFontSize} from '../../context/FontSizeContext';
import {useTheme} from '../../context/ThemeContext';
import ButtonCompt from './ButtonCompt';

const languages = [
  {code: 'en', label: 'English'},
  {code: 'hi', label: 'हिंदी'},
];

const LanguageSelectorPopup = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const {language, setLanguage} = useLanguage();

  const handleSelect = (code: string) => {
    setLanguage(code);
    onClose();
  };

  const {sizes, fontFamily, setFontName} = useFontSize();
  const {colors} = useTheme();
  const {t}=useLanguage()

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            {backgroundColor: colors.card, shadowColor: colors.text},
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fontFamily.semiBold,
                color: colors.text,
                fontSize: sizes.heading,
              }}>
                {t('select_language')}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={languages}
            keyExtractor={item => item.code}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  language === item.code && {backgroundColor: colors.card},
                ]}
                onPress={() => handleSelect(item.code)}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Semibold',
                    color: colors.text,
                    fontSize: sizes.subheading,
                  }}>
                  {item.label}
                </Text>
                {language === item.code && (
                  <Ionicons name="checkmark" size={20} color="green" />
                )}
              </TouchableOpacity>
            )}
          />

          <ButtonCompt
            title={t('close')}
            onPress={onClose}
            style={{
              paddingVertical: 8,
              marginTop: 20,
              width: '50%',
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
  },

  closeBtn: {
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  closeBtnText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default LanguageSelectorPopup;

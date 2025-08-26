import React, { memo } from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useFontSize} from '../../context/FontSizeContext';
import color from '../../theme/color';
import ButtonCompt from './ButtonCompt';
import {useTheme} from '../../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useLanguage} from '../../context/LanguageContext';

const FontFamilyModal = ({visible, onClose}: any) => {
  const {sizes, fontFamily, setFontName, fontName} = useFontSize();
  const {colors} = useTheme();
  const {t} = useLanguage();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: colors.card,
              shadowColor: colors.text,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text
              style={{
                fontFamily: fontFamily.semiBold,
                color: colors.text,
                fontSize: sizes.heading,
              }}>
              {t('select_font_family')}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              borderColor: '#ccc',
              paddingBottom: 5,
              alignItems: 'center',
            }}
            onPress={() => {
              setFontName('Poppins');
              onClose();
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Semibold',
                color: colors.text,
                fontSize: sizes.subheading,
                marginTop: 5,
              }}>
              Poppins
            </Text>

            {fontName === 'Poppins' && (
              <Ionicons name="checkmark" size={20} color="green" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              borderColor: '#ccc',
              paddingBottom: 5,
              alignItems: 'center',
              marginTop: 5,
            }}
            onPress={() => {
              setFontName('Khand');
              onClose();
            }}>
            <Text
              style={{
                fontFamily: 'Khand',
                color: colors.text,
                fontSize: sizes.subheading,
                marginVertical: 5,
              }}>
              Khand
            </Text>
            {fontName === 'Khand' && (
              <Ionicons name="checkmark" size={20} color="green" />
            )}
          </TouchableOpacity>

          <ButtonCompt
            title={t("close")}
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

export default memo(FontFamilyModal);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000088',
    padding: 20,
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
});

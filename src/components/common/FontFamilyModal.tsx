import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useFontSize} from '../../context/FontSizeContext';
import color from '../../theme/color';
import ButtonCompt from './ButtonCompt';
import {useTheme} from '../../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FontFamilyModal = ({visible, onClose}: any) => {
  const {sizes, fontFamily, setFontName} = useFontSize();
  const {colors} = useTheme();

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
              Select Font Family
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setFontName('Poppins')}>
            <Text
              style={{
                fontFamily: 'Poppins-Semibold',
                color: colors.text,
                fontSize: sizes.subheading,
                marginTop: 5,
              }}>
              Poppins
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFontName('Khand')}>
            <Text
              style={{
                fontFamily: 'Khand',
                color: colors.text,
                fontSize: sizes.subheading,
                marginVertical: 5,
              }}>
              Khand
            </Text>
          </TouchableOpacity>

          <ButtonCompt
            title="Close"
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

export default FontFamilyModal;

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

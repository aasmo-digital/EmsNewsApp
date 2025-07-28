import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useFontSize} from '../../context/FontSizeContext';
import color from '../../theme/color';
import {useTheme} from '../../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonCompt from './ButtonCompt';

const fontOptions = [
  {label: 'Small', size: 12},
  {label: 'Medium', size: 14},
  {label: 'Large', size: 16},
  {label: 'Extra Large', size: 18},
];

const FontSizeModal = ({visible, onClose}: any) => {
  const {setBaseSize, fontFamily, sizes} = useFontSize();
  const {colors} = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, {backgroundColor: colors.card}]}>
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
              Select Text Size
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={fontOptions}
            keyExtractor={item => item.label}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  setBaseSize(item.size);
                  onClose();
                }}>
                <Text style={[{fontSize: item.size, color: colors.text}]}>
                  {item.label} (Body: {item.size}, Heading: {item.size * 1.5})
                </Text>
              </TouchableOpacity>
            )}
          />

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

export default FontSizeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },

  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  closeButton: {
    marginTop: 10,
  },
  closeText: {
    color: 'blue',
    textAlign: 'right',
  },
});

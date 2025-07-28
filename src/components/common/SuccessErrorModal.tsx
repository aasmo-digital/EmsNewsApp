import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  StatusBar,
} from 'react-native';
import color from '../../theme/color';
import {useTheme} from '../../context/ThemeContext';
import {useFontSize} from '../../context/FontSizeContext';

interface SuccessErrorModalProps {
  visible: boolean;
  imageSource?: ImageSourcePropType;
  title?: string;
  subtitle?: string;
  onClose: () => void;
}

const SuccessErrorModal: React.FC<SuccessErrorModalProps> = ({
  visible,
  imageSource,
  title,
  subtitle,
  onClose,
}) => {
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: colors.background, shadowColor: colors.text},
          ]}>
          <StatusBar
            translucent
            backgroundColor="rgba(0,0,0,0.5)"
            barStyle="light-content"
          />
          {imageSource && <Image source={imageSource} style={styles.image} />}
          {title && (
            <Text
              style={[
                styles.title,
                {
                  fontSize: sizes.heading,
                  color: colors.text,
                  fontFamily: fontFamily.semiBold,
                },
              ]}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                {
                  fontSize: sizes.subheading,
                  color: colors.text,
                  fontFamily: fontFamily.regular,
                },
              ]}>
              {subtitle}
            </Text>
          )}
          <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.btnbg}]}
            onPress={onClose}>
            <Text
              style={{
                fontSize: sizes.subheading,
                color: colors.btntext,
                fontFamily: fontFamily.regular,
                letterSpacing: 0.5,
              }}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessErrorModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
});

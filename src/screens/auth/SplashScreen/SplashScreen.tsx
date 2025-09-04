import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../../navigation/types';
import {PageContainer} from '../../../components/componentsIndex';
import imageIndex from '../../../assets/imageIndex';
import color from '../../../theme/color';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/redux/store';
import Video from 'react-native-video';
import {useTheme} from '../../../context/ThemeContext';
import {useFontSize} from '../../../context/FontSizeContext';
import {useLanguage} from '../../../context/LanguageContext';

// Define the navigation props for this screen

const SplashScreen = ({navigation}: any) => {
  const {height, width} = Dimensions.get('screen');
  const isLogin = useSelector((state: RootState) => state?.UserData?.isLogin);

  const {mode} = useTheme();
  const {fontName} = useFontSize();
  const {language} = useLanguage();

  console.log('------isLogin', isLogin);
  console.log('-----------mode----------', mode);
  console.log('-----------fontName----------', fontName);
  console.log('-----------language----------', language);

  useEffect(() => {
    const timer = setTimeout(() => {
      isLogin ? navigation.replace('App') : navigation.replace('Auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLogin, navigation]);

  return (
    <PageContainer>
      <StatusBar translucent backgroundColor={color.transparent} />

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <ImageBackground
          resizeMode="cover"
          style={{flex: 1, height: '100%', width: '100%'}}
          source={imageIndex?.splash}
        /> */}
        <Video
          source={require('../../../assets/videos/backVideo.mp4')} // replace with your video link or require(localVideo)
          style={{height: height, width: width}}
          resizeMode="cover"
          repeat
          muted={true} // ✅ sound will be off
        />
        <Image style={styles.logo} source={imageIndex.logo} />
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'stretch',
    position: 'absolute',
    borderRadius: 10,
  },
  brandText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F', // A red color matching your design
    letterSpacing: 1,
  },
  video: {
    width: 300,
    height: 200,
    // flex:1
  },
});

export default SplashScreen;

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

// Define the navigation props for this screen

const SplashScreen = ({navigation}: any) => {
  const {height, width} = Dimensions.get('screen');
  const isLogin = useSelector((state: RootState) => state?.UserData?.isLogin);

  console.log('------isLogin', isLogin);

  useEffect(() => {
    const timer = setTimeout(() => {
      isLogin ? navigation.replace('App') : navigation.replace('Auth');
    }, 2500);

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
          source={require('../../../assets/videos/splashscreenvideo.mp4')} // replace with your video link or require(localVideo)
          style={styles.video}
          resizeMode="contain"
          repeat
          muted={false}
          // controls={true} // if you want play/pause controls
        />
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
    resizeMode: 'contain',
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
  },
});

export default SplashScreen;

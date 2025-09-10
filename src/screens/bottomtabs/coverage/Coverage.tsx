import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import {CommentsSheet, SingleReel} from '../../../components/componentsIndex';
import useCoverage from './useCoverage';
import imageIndex from '../../../assets/imageIndex';

const {width, height: windowHeight} = Dimensions.get('screen');

const Coverage = () => {
  const commentsSheetRef = useRef(null);
  const [visibleReelId, setVisibleReelId] = useState<string | undefined>(
    undefined,
  );

  const tabBarHeight = useBottomTabBarHeight();
  const playerHeight = windowHeight - tabBarHeight;

  const {allShortsLoading, allShorts, getAllShorts, reels} = useCoverage();

  // console.log('--------------reels---------', reels);

  // // 🔹 Run only when screen focused
  // useFocusEffect(
  //   useCallback(() => {
  //     if (!allShorts || allShorts.length === 0) {
  //       getAllShorts();
  //     }
  //   }, [allShorts, getAllShorts]),
  // );

  useEffect(() => {
    getAllShorts();
  }, []);

  // 🔹 Optimize viewability check
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems?.length > 0) {
      setVisibleReelId(viewableItems[0].item._id);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70, // stricter → reduces false triggers
  }).current;

  // 🔹 Memoized render function (no re-creation every render)
  const renderItem = useCallback(
    ({item}) => (
      <SingleReel
        item={item}
        isVisible={visibleReelId === item._id}
        playerHeight={playerHeight}
        onPressComment={() => commentsSheetRef.current?.present()}
      />
    ),
    [visibleReelId, playerHeight],
  );

  return (
    <BottomSheetModalProvider>
      <View style={{height: playerHeight, backgroundColor: 'black'}}>
        <StatusBar barStyle="light-content" />

        {allShortsLoading ? (
          <ActivityIndicator size="large" style={{flex: 1}} />
        ) : (
          <FlatList
            // data={allShorts}
            data={allShorts}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            getItemLayout={(data, index) => ({
              length: playerHeight,
              offset: playerHeight * index,
              index,
            })}
            // 🚀 Performance props
            initialNumToRender={2} // only 2 videos at start
            maxToRenderPerBatch={2} // reduce memory
            windowSize={3} // only keep 1 prev + 1 next in memory
            removeClippedSubviews // unmounts offscreen reels
          />
        )}

        <Image
          source={imageIndex?.logo}
          style={{
            height: 80,
            width: 70,
            position: 'absolute',
            top: 40,
            left: 10,
            resizeMode: 'stretch',
            borderRadius: 10,
          }}
        />

        {/* Comments modal */}
        {/* <CommentsSheet ref={commentsSheetRef} /> */}
      </View>
    </BottomSheetModalProvider>
  );
};

export default Coverage;

// import {
//   View,
//   FlatList,
//   Dimensions,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';
// import React, {useState, useCallback, useRef, useEffect} from 'react';
// import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'; // <-- IMPORT THIS HOOK
// import {CommentsSheet, SingleReel} from '../../../components/componentsIndex';

// import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
// import {DUMMY_DATA} from './const.data';
// import {useFocusEffect} from '@react-navigation/native';
// import useCoverage from './useCoverage';

// const {width, height: windowHeight} = Dimensions.get('screen');

// const Coverage = () => {
//   const commentsSheetRef = useRef(null);

//   const handlePresentCommentsModal = useCallback(() => {
//     commentsSheetRef.current?.present();
//   }, []);
//   const [visibleReelId, setVisibleReelId] = useState(undefined);

//   // NEW: Get the height of the bottom tab bar
//   const tabBarHeight = useBottomTabBarHeight();

//   // NEW: Calculate the correct height for the video player
//   const playerHeight = windowHeight - tabBarHeight;

//   const onViewableItemsChanged = useCallback(({viewableItems}) => {
//     if (viewableItems.length > 0) {
//       setVisibleReelId(viewableItems[0].item.id);
//     }
//   }, []);

//   const viewabilityConfig = useRef({itemVisiblePercentThreshold: 50}).current;

//   const {allShortsLoading, allShorts, getAllShorts} = useCoverage();

//   // 🔁 getAllCategory Call

//   useFocusEffect(
//     useCallback(() => {
//       getAllShorts();

//       // cleanup (optional) if needed
//       return () => {
//         console.log('Screen unfocused');
//       };
//     }, []),
//   );

//   return (
//     // MODIFIED: This container now has the correct height
//     <BottomSheetModalProvider>
//       <View style={{height: playerHeight, backgroundColor: 'black'}}>
//         <StatusBar barStyle="light-content" />
//         {allShortsLoading ? (
//           <ActivityIndicator size={'large'} />
//         ) : (
//           <FlatList
//             data={allShorts}
//             renderItem={({item}) => (
//               // MODIFIED: Pass the calculated height down to the child component
//               <SingleReel
//                 item={item}
//                 isVisible={visibleReelId === item._id}
//                 playerHeight={playerHeight}
//                 onPressComment={handlePresentCommentsModal}
//               />
//             )}
//             keyExtractor={item => item._id}
//             pagingEnabled
//             showsVerticalScrollIndicator={false}
//             decelerationRate="fast"
//             onViewableItemsChanged={onViewableItemsChanged}
//             viewabilityConfig={viewabilityConfig}
//             // MODIFIED: This tells the FlatList how tall each "page" is
//             getItemLayout={(data, index) => ({
//               length: playerHeight,
//               offset: playerHeight * index,
//               index,
//             })}
//           />
//         )}

//         {/* <CommentsSheet ref={commentsSheetRef} /> */}
//       </View>
//     </BottomSheetModalProvider>
//   );
// };

// export default Coverage;

// import {View, Text} from 'react-native';
// import React from 'react';

// const Coverage = () => {
//   return (
//     <View>
//       <Text>Coverage</Text>
//     </View>
//   );
// };

// export default Coverage;

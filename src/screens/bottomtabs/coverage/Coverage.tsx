import {
  View,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'; // <-- IMPORT THIS HOOK
import {CommentsSheet, SingleReel} from '../../../components/componentsIndex';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const {width, height: windowHeight} = Dimensions.get('screen');

const DUMMY_DATA = [
  {
    _id: '689089e91056203df58d137d',
    title: 'My Short Video',
    description: 'A fun short reel!',
    videoUrl:
      'https://uma-classees.blr1.digitaloceanspaces.com/shorts-videos/8a675ca1-c6d8-4bbc-a4bc-d589e24b4b0e.mp4',
    thumbnailUrl: '',
    status: 'published',
    createdBy: {
      _id: '688de28d844f20fe51683a37',
      name: 'Reporter One',
      email: 'reporter1@example.com',
      profileImage: null,
      id: '688de28d844f20fe51683a37',
    },
    category: null,
    subCategory: null,
    country: null,
    state: null,
    city: null,
    viewsCount: 0,
    publishedAt: '2025-08-04T10:22:33.281Z',
    likes: [
      {
        user: {
          _id: '6891b7ca306e116fafd05b8d',
          name: 'John Doe',
          profileImage: null,
          id: '6891b7ca306e116fafd05b8d',
        },
        _id: '6891b8cf306e116fafd05c5b',
        likedAt: '2025-08-05T07:54:55.879Z',
        id: '6891b8cf306e116fafd05c5b',
      },
      {
        user: {
          _id: '687a3bf407f15b8479cb999e',
          name: 'User',
          profileImage:
            'https://uma-classees.blr1.digitaloceanspaces.com/profile-images/1bd2c052-6e21-4f72-a7df-bff447c99846.avif',
          id: '687a3bf407f15b8479cb999e',
        },
        _id: '6891baa8306e116fafd05d5b',
        likedAt: '2025-08-05T08:02:48.073Z',
        id: '6891baa8306e116fafd05d5b',
      },
      {
        user: {
          _id: '6891b82f306e116fafd05bc6',
          name: 'John Doe',
          profileImage: null,
          id: '6891b82f306e116fafd05bc6',
        },
        _id: '6891deebcf416bce67e56fbb',
        likedAt: '2025-08-05T10:37:31.211Z',
        id: '6891deebcf416bce67e56fbb',
      },
    ],
    comments: [
      {
        user: {
          _id: '68808b3786169c7751a3ac93',
          name: 'yashwant patel',
          profileImage:
            'https://uma-classees.blr1.digitaloceanspaces.com/profile-images/bfddd1d2-433c-4f39-be8d-5ac866f4fdf9.jpg',
          id: '68808b3786169c7751a3ac93',
        },
        text: 'Awesome short! 🔥',
        _id: '68909519fefb9bb1a3fc8be7',
        commentedAt: '2025-08-04T11:10:17.203Z',
        replies: [
          {
            user: {
              _id: '68808b3786169c7751a3ac93',
              name: 'yashwant patel',
              profileImage:
                'https://uma-classees.blr1.digitaloceanspaces.com/profile-images/bfddd1d2-433c-4f39-be8d-5ac866f4fdf9.jpg',
              id: '68808b3786169c7751a3ac93',
            },
            text: 'Thanks bro! 🙏',
            repliedAt: '2025-08-04T11:13:28.918Z',
            _id: '689095d8fefb9bb1a3fc8c11',
            id: '689095d8fefb9bb1a3fc8c11',
          },
        ],
        id: '68909519fefb9bb1a3fc8be7',
      },
    ],
    createdAt: '2025-08-04T10:22:33.299Z',
    updatedAt: '2025-08-05T10:37:31.214Z',
    __v: 87,
    likesCount: 3,
    commentsCount: 1,
    id: '689089e91056203df58d137d',
    isLikedByCurrentUser: false,
    postedDate: '2025-08-04',
    createdAtDate: '2025-08-04',
  },
  {
    _id: '689084a319e28758241df12a',
    title: 'Uski muskurahat meri kamzori ban gayi.',
    description:
      'Kuch rishton ka naam nahi hota, bas ehsaas hi kaafi hote hain...',
    videoUrl:
      'https://uma-classees.blr1.digitaloceanspaces.com/shorts-videos/73870cce-ab2e-4d50-b0d6-a5462802c9ab.mp4',
    thumbnailUrl: '',
    status: 'published',
    createdBy: {
      _id: '68907cb0fc4d0cc2dfb54a8a',
      name: 'Admin One',
      email: 'admin11@example.com',
      profileImage: null,
      id: '68907cb0fc4d0cc2dfb54a8a',
    },
    category: null,
    subCategory: null,
    country: null,
    state: null,
    city: null,
    viewsCount: 0,
    publishedAt: '2025-08-04T10:00:03.295Z',
    likes: [
      {
        user: {
          _id: '68808b3786169c7751a3ac93',
          name: 'yashwant patel',
          profileImage:
            'https://uma-classees.blr1.digitaloceanspaces.com/profile-images/bfddd1d2-433c-4f39-be8d-5ac866f4fdf9.jpg',
          id: '68808b3786169c7751a3ac93',
        },
        _id: '6891b87d306e116fafd05bf9',
        likedAt: '2025-08-05T07:53:33.228Z',
        id: '6891b87d306e116fafd05bf9',
      },
      {
        user: {
          _id: '6891b82f306e116fafd05bc6',
          name: 'John Doe',
          profileImage: null,
          id: '6891b82f306e116fafd05bc6',
        },
        _id: '6891deedcf416bce67e56fc0',
        likedAt: '2025-08-05T10:37:33.312Z',
        id: '6891deedcf416bce67e56fc0',
      },
    ],
    comments: [],
    createdAt: '2025-08-04T10:00:03.296Z',
    updatedAt: '2025-08-05T10:37:33.314Z',
    __v: 24,
    likesCount: 2,
    commentsCount: 0,
    id: '689084a319e28758241df12a',
    isLikedByCurrentUser: false,
    postedDate: '2025-08-04',
    createdAtDate: '2025-08-04',
  },
  {
    _id: '6890841519e28758241df126',
    title: 'motivation',
    description:
      'Har din ek naya moka hai. Ruko mat, thako mat. Bas chalte raho! 💯',
    videoUrl:
      'https://uma-classees.blr1.digitaloceanspaces.com/shorts-videos/0e4a3815-6d11-4951-99f6-c902d584842b.mp4',
    thumbnailUrl: '',
    status: 'published',
    createdBy: {
      _id: '68907cb0fc4d0cc2dfb54a8a',
      name: 'Admin One',
      email: 'admin11@example.com',
      profileImage: null,
      id: '68907cb0fc4d0cc2dfb54a8a',
    },
    category: null,
    subCategory: null,
    country: null,
    state: null,
    city: null,
    viewsCount: 0,
    publishedAt: '2025-08-04T09:57:41.298Z',
    likes: [],
    comments: [],
    createdAt: '2025-08-04T09:57:41.301Z',
    updatedAt: '2025-08-05T10:32:47.351Z',
    __v: 6,
    likesCount: 0,
    commentsCount: 0,
    id: '6890841519e28758241df126',
    isLikedByCurrentUser: false,
    postedDate: '2025-08-04',
    createdAtDate: '2025-08-04',
  },
  {
    _id: '6890835919e28758241df10c',
    title: 'Video',
    description: 'reel!',
    videoUrl:
      'https://uma-classees.blr1.digitaloceanspaces.com/shorts-videos/0386194f-ff2c-4289-b92e-5bd4e08c2197.mp4',
    thumbnailUrl: '',
    status: 'published',
    createdBy: {
      _id: '68907cb0fc4d0cc2dfb54a8a',
      name: 'Admin One',
      email: 'admin11@example.com',
      profileImage: null,
      id: '68907cb0fc4d0cc2dfb54a8a',
    },
    category: null,
    subCategory: null,
    country: null,
    state: null,
    city: null,
    viewsCount: 0,
    publishedAt: '2025-08-04T09:54:33.637Z',
    likes: [
      {
        user: {
          _id: '68808b3786169c7751a3ac93',
          name: 'yashwant  patel',
          profileImage:
            'https://uma-classees.blr1.digitaloceanspaces.com/profile-images/bfddd1d2-433c-4f39-be8d-5ac866f4fdf9.jpg',
          id: '68808b3786169c7751a3ac93',
        },
        _id: '6891b791306e116fafd05b8a',
        likedAt: '2025-08-05T07:49:37.772Z',
        id: '6891b791306e116fafd05b8a',
      },
      {
        user: {
          _id: '6891b82f306e116fafd05bc6',
          name: 'John Doe',
          profileImage: null,
          id: '6891b82f306e116fafd05bc6',
        },
        _id: '6891d683b35d2f0586ab48eb',
        likedAt: '2025-08-05T10:01:39.308Z',
        id: '6891d683b35d2f0586ab48eb',
      },
    ],
    comments: [],
    createdAt: '2025-08-04T09:54:33.639Z',
    updatedAt: '2025-08-05T10:01:39.310Z',
    __v: 6,
    likesCount: 2,
    commentsCount: 0,
    id: '6890835919e28758241df10c',
    isLikedByCurrentUser: false,
    postedDate: '2025-08-04',
    createdAtDate: '2025-08-04',
  },
  {
    _id: '689082c619e28758241df0f8',
    title: 'My Short Video',
    description: 'A fun short reel!',
    videoUrl:
      'https://uma-classees.blr1.digitaloceanspaces.com/shorts-videos/2e0a1a5b-537a-46fd-b06f-0582dd950ad9.mp4',
    thumbnailUrl: '',
    status: 'published',
    createdBy: {
      _id: '68907cb0fc4d0cc2dfb54a8a',
      name: 'Admin One',
      email: 'admin11@example.com',
      profileImage: null,
      id: '68907cb0fc4d0cc2dfb54a8a',
    },
    category: null,
    subCategory: null,
    country: null,
    state: null,
    city: null,
    viewsCount: 0,
    publishedAt: '2025-08-04T09:52:06.229Z',
    likes: [
      {
        user: {
          _id: '6891b82f306e116fafd05bc6',
          name: 'John Doe',
          profileImage: null,
          id: '6891b82f306e116fafd05bc6',
        },
        _id: '6891d684b35d2f0586ab48ef',
        likedAt: '2025-08-05T10:01:40.893Z',
        id: '6891d684b35d2f0586ab48ef',
      },
    ],
    comments: [],
    createdAt: '2025-08-04T09:52:06.238Z',
    updatedAt: '2025-08-05T10:01:40.895Z',
    __v: 3,
    likesCount: 1,
    commentsCount: 0,
    id: '689082c619e28758241df0f8',
    isLikedByCurrentUser: false,
    postedDate: '2025-08-04',
    createdAtDate: '2025-08-04',
  },
  {
    _id: '688b32084f3902b474ab2df3',
    title: 'My Short Video',
    description: 'A fun short reel!',
    videoUrl:
      'https://uma-classees.blr1.digitaloceanspaces.com/shorts-videos/7b8b1965-a140-4fa1-889e-ea5a4c0661bd.mp4',
    thumbnailUrl: '',
    status: 'published',
    createdBy: null,
    category: null,
    subCategory: null,
    country: null,
    state: null,
    city: null,
    viewsCount: 0,
    publishedAt: '2025-07-31T09:06:16.844Z',
    likes: [
      {
        user: {
          _id: '6891b82f306e116fafd05bc6',
          name: 'John Doe',
          profileImage: null,
          id: '6891b82f306e116fafd05bc6',
        },
        _id: '6891d698b35d2f0586ab495d',
        likedAt: '2025-08-05T10:02:00.173Z',
        id: '6891d698b35d2f0586ab495d',
      },
    ],
    comments: [],
    createdAt: '2025-07-31T09:06:16.857Z',
    updatedAt: '2025-08-05T10:02:00.174Z',
    __v: 5,
    likesCount: 1,
    commentsCount: 0,
    id: '688b32084f3902b474ab2df3',
    isLikedByCurrentUser: false,
    postedDate: '2025-07-31',
    createdAtDate: '2025-07-31',
  },
  {
    category: null,
    subCategory: null,
    country: null,
    state: null,
    city: null,
    _id: '688b1aa36e40aacdad060954',
    title: 'My Short Video',
    description: 'A fun short reel!',
    videoUrl:
      'https://uma-classees.blr1.digitaloceanspaces.com/shorts-videos/d2b7d84c-a968-42fe-a6de-5cbc7aa49fe0.mp4',
    thumbnailUrl: '',
    status: 'published',
    createdBy: null,
    viewsCount: 0,
    publishedAt: '2025-07-31T07:26:27.721Z',
    likes: [
      {
        user: {
          _id: '6891b82f306e116fafd05bc6',
          name: 'John Doe',
          profileImage: null,
          id: '6891b82f306e116fafd05bc6',
        },
        _id: '6891d687b35d2f0586ab48f7',
        likedAt: '2025-08-05T10:01:43.714Z',
        id: '6891d687b35d2f0586ab48f7',
      },
    ],
    comments: [],
    createdAt: '2025-07-31T07:26:27.732Z',
    updatedAt: '2025-08-05T10:01:43.716Z',
    __v: 11,
    likesCount: 1,
    commentsCount: 0,
    id: '688b1aa36e40aacdad060954',
    isLikedByCurrentUser: false,
    postedDate: '2025-07-31',
    createdAtDate: '2025-07-31',
  },
];

const Coverage = () => {
  const commentsSheetRef = useRef(null);

  const handlePresentCommentsModal = useCallback(() => {
    commentsSheetRef.current?.present();
  }, []);
  const [visibleReelId, setVisibleReelId] = useState(DUMMY_DATA[0]?.id);

  // NEW: Get the height of the bottom tab bar
  const tabBarHeight = useBottomTabBarHeight();

  // NEW: Calculate the correct height for the video player
  const playerHeight = windowHeight - tabBarHeight;

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setVisibleReelId(viewableItems[0].item.id);
    }
  }, []);

  const viewabilityConfig = useRef({itemVisiblePercentThreshold: 50}).current;

  // 🔁 getAllCategory Call
  const [allShortsLoading, setAllShortsLoading] = useState(false);
  const [allShorts, setAllShorts] = useState(DUMMY_DATA);
  const getAllShorts = async () => {
    setAllShortsLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllShorts,
        method: 'GET',
      });
      if (response) {
        console.log(
          '------------getAllShorts--',
          JSON.stringify(response?.data),
        );
        setAllShortsLoading(false);
        setAllShorts(response?.data);
      } else {
        setAllShortsLoading(false);
      }
    } catch (error: any) {
      setAllShortsLoading(false);
      console.error(' Error:', error.message);
    }
  };

  // useEffect(() => {
  //   getAllShorts();
  // }, []);
  return (
    // MODIFIED: This container now has the correct height
    <BottomSheetModalProvider>
      <View style={{height: playerHeight, backgroundColor: 'black'}}>
        <StatusBar barStyle="light-content" />
        {allShortsLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <FlatList
            data={allShorts}
            renderItem={({item}) => (
              // MODIFIED: Pass the calculated height down to the child component
              <SingleReel
                item={item}
                isVisible={visibleReelId === item._id}
                playerHeight={playerHeight}
                onPressComment={handlePresentCommentsModal}
              />
            )}
            keyExtractor={item => item._id}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            // MODIFIED: This tells the FlatList how tall each "page" is
            getItemLayout={(data, index) => ({
              length: playerHeight,
              offset: playerHeight * index,
              index,
            })}
          />
        )}

        {/* <CommentsSheet ref={commentsSheetRef} /> */}
      </View>
    </BottomSheetModalProvider>
  );
};

export default Coverage;

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

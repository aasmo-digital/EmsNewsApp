import {combineReducers} from 'redux';
import UserData from './userReducer/reducer';
import NewsData from './slices/NewsSlice';
import SelectLocationSlice from './slices/SelectedLocationSlice';
import interestsReducer from './slices/interestsSlice';

import newsReducer from './slices/newsSlice';
import reelReducer from './slices/reelSlice';
import videosReducer from './slices/videosSlice';
import newsCategoryReducer from './slices/newCategorySlice';

const rootReducer = combineReducers({
  UserData: UserData,
  NewsData: NewsData,
  news: newsReducer,
  newsCategory: newsCategoryReducer,

  reels: reelReducer,
  videos: videosReducer,
  interests: interestsReducer,

  SelectLocationSlice: SelectLocationSlice,
});

export default rootReducer;

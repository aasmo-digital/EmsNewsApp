import {combineReducers} from 'redux';
import UserData from './userReducer/reducer';
import NewsData from './slices/NewsSlice';
import SelectLocationSlice from './slices/SelectedLocationSlice';

import newsReducer from './slices/newsSlice';
import reelReducer from './slices/reelSlice';
import videosReducer from './slices/videosSlice';

const rootReducer = combineReducers({
  UserData: UserData,
  NewsData: NewsData,
  news: newsReducer,
  reels: reelReducer,
  videos: videosReducer,
  SelectLocationSlice: SelectLocationSlice,
});

export default rootReducer;

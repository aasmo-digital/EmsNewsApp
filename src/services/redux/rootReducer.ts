import {combineReducers} from 'redux';
import UserData from './userReducer/reducer';
import NewsData from  "./slices/NewsSlice";

const rootReducer = combineReducers({
  UserData: UserData,
  NewsData: NewsData,
});

export default rootReducer;

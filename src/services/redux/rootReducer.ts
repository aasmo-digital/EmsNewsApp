import {combineReducers} from 'redux';
import UserData from './userReducer/reducer';
import NewsData from  "./slices/NewsSlice";
import SelectLocationSlice from "./slices/SelectedLocationSlice"

const rootReducer = combineReducers({
  UserData: UserData,
  NewsData: NewsData,
  SelectLocationSlice:SelectLocationSlice

});

export default rootReducer;

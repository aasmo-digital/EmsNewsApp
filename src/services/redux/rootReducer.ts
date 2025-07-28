import { combineReducers } from 'redux';
import UserData from './userReducer/reducer';

const rootReducer = combineReducers({
  UserData: UserData,
});

export default rootReducer;

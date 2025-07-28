import {createSlice} from '@reduxjs/toolkit';
import {ReducerState} from './interface';
import {Log} from '../../../utility/log';

const initialState: ReducerState = {
  userData: {},
  isLogin: false,
  token: undefined,
  id: undefined,
};

const UserData = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      return {
        ...state,
        token: action.payload?.accessToken,
        isLogin: true,
      };
    },
    logoutSucces: state => {
      return {
        ...state,
        userData: undefined,
        isLogin: false,
        token: undefined,
        isSessionOut: false,
      };
    },
    getUserDetails: (state, action) => {
      return {
        ...state,
        userData: action.payload,
      };
    },
  },
});

export const {loginSuccess, getUserDetails, logoutSucces} = UserData.actions;

export default UserData.reducer;

// src/redux/slices/newsSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface NewsState {
  newsCategory: any[];
}

const initialState: NewsState = {
  newsCategory: [],
};

const newsSlice = createSlice({
  name: 'newsCategory',
  initialState,
  reducers: {
    setNewsCategory: (state, action: PayloadAction<any[]>) => {
      state.newsCategory = action.payload;
    },
    clearNewsCategory: state => {
      state.newsCategory = [];
    },
  },
});

export const {setNewsCategory, clearNewsCategory} = newsSlice.actions;
export default newsSlice.reducer;

// src/redux/slices/newsSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface NewsState {
  news: any[];
}

const initialState: NewsState = {
  news: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<any[]>) => {
      state.news = action.payload;
    },
    clearNews: state => {
      state.news = [];
    },
  },
});

export const {setNews, clearNews} = newsSlice.actions;
export default newsSlice.reducer;

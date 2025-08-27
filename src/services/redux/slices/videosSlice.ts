// src/redux/slices/videosSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface VideosState {
  videos: any[];
}

const initialState: VideosState = {
  videos: [],
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<any[]>) => {
      state.videos = action.payload;
    },
    clearVideos: (state) => {
      state.videos = [];
    },
  },
});

export const {setVideos, clearVideos} = videosSlice.actions;
export default videosSlice.reducer;

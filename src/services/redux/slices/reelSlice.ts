// src/redux/slices/reelSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ReelState {
  reels: any[];
}

const initialState: ReelState = {
  reels: [],
};

const reelSlice = createSlice({
  name: 'reels',
  initialState,
  reducers: {
    setReels: (state, action: PayloadAction<any[]>) => {
      state.reels = action.payload;
    },
    clearReels: (state) => {
      state.reels = [];
    },
  },
});

export const {setReels, clearReels} = reelSlice.actions;
export default reelSlice.reducer;

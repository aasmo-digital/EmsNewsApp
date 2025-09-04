import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InterestsState {
  selected: string[]; // sirf IDs rakhenge
}

const initialState: InterestsState = {
  selected: [],
};

const interestsSlice = createSlice({
  name: 'interests',
  initialState,
  reducers: {
    toggleInterest: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selected.includes(id)) {
        // agar pehle se select hai toh remove kar do
        state.selected = state.selected.filter(item => item !== id);
      } else {
        // otherwise add kar do
        state.selected.push(id);
      }
    },
    setInterests: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
    },
    clearInterests: (state) => {
      state.selected = [];
    },
  },
});

export const { toggleInterest, setInterests, clearInterests } = interestsSlice.actions;
export default interestsSlice.reducer;

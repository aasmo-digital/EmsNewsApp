// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface InterestsState {
//   selected: string[]; // sirf IDs rakhenge
// }

// const initialState: InterestsState = {
//   selected: [],
// };

// const interestsSlice = createSlice({
//   name: 'interests',
//   initialState,
//   reducers: {
//     toggleInterest: (state, action: PayloadAction<string>) => {
//       const id = action.payload;
//       if (state.selected.includes(id)) {
//         // agar pehle se select hai toh remove kar do
//         state.selected = state.selected.filter(item => item !== id);
//       } else {
//         // otherwise add kar do
//         state.selected.push(id);
//       }
//     },
//     setInterests: (state, action: PayloadAction<string[]>) => {
//       state.selected = action.payload;
//     },
//     clearInterests: (state) => {
//       state.selected = [];
//     },
//   },
// });

// export const { toggleInterest, setInterests, clearInterests } = interestsSlice.actions;
// export default interestsSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the structure of a single interest/category object
export interface NewsCategory {
  _id: string; // Using _id as the unique identifier
  __v: number;
  createdAt: string;
  description: string;
  name: string;
  slug: string;
  updatedAt: string;
  icon?: string; // Add icon if you plan to fetch it, otherwise remove or make optional
}

interface InterestsState {
  selected: NewsCategory[]; // Now stores an array of full NewsCategory objects
}

const initialState: InterestsState = {
  selected: [],
};

const interestsSlice = createSlice({
  name: 'interests',
  initialState,
  reducers: {
    toggleInterest: (state, action: PayloadAction<NewsCategory>) => {
      const newCategory = action.payload;
      // Check if an item with the same _id already exists in the selected array
      const existingIndex = state.selected.findIndex(
        item => item?._id === newCategory?._id,
      );

      if (existingIndex !== -1) {
        // If it exists, remove it (deselect)
        state.selected.splice(existingIndex, 1);
      } else {
        // If it doesn't exist, add it (select)
        state.selected.push(newCategory);
      }
    },
    setInterests: (state, action: PayloadAction<NewsCategory[]>) => {
      // This reducer can be used to load initial interests (e.g., from local storage or user profile)
      state.selected = action.payload;
    },
    clearInterests: state => {
      state.selected = [];
    },
  },
});

export const {toggleInterest, setInterests, clearInterests} =
  interestsSlice.actions;
export default interestsSlice.reducer;

// src/redux/slices/SelectLocationSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  countryId: string | null;
  countryName: string | null;
  stateId: string | null;
  stateName: string | null;
  cityId: string | null;
  cityName: string | null;
}

const initialState: LocationState = {
  countryId: null,
  countryName: null,
  stateId: null,
  stateName: null,
  cityId: null,
  cityName: null,
};

const SelectLocationSlice = createSlice({
  name: "selectLocation",
  initialState,
  reducers: {
    setCountry: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.countryId = action.payload.id;
      state.countryName = action.payload.name;

      // Reset state & city jab country change ho
      state.stateId = null;
      state.stateName = null;
      state.cityId = null;
      state.cityName = null;
    },
    setState: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.stateId = action.payload.id;
      state.stateName = action.payload.name;

      // Reset city jab state change ho
      state.cityId = null;
      state.cityName = null;
    },
    setCity: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.cityId = action.payload.id;
      state.cityName = action.payload.name;
    },
    resetLocation: () => initialState,
  },
});

export const { setCountry, setState, setCity, resetLocation } =
  SelectLocationSlice.actions;

export default SelectLocationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showGrid: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleLayout(state) {
      state.showGrid = !state.showGrid;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

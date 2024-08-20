// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarExtended: true,
};

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarExtended = !state.sidebarExtended;
    },
  },
});

export const { toggleSidebar } = utilsSlice.actions;

export default utilsSlice.reducer;

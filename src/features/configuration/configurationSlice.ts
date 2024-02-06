import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

type Configuration = {
  isSidebarOpen: boolean;
  isGridView: boolean;
  isAdminSidebarOpen: boolean;
};

const initialState: Configuration = {
  isSidebarOpen: false,
  isGridView: false,
  isAdminSidebarOpen: false,
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
    toggleGridView(state, action: PayloadAction<boolean>) {
      state.isGridView = action.payload;
    },
    toggleAdminSidebar(state) {
      state.isAdminSidebarOpen = !state.isAdminSidebarOpen;
    },
  },
});

export const { toggleSidebar, toggleGridView, toggleAdminSidebar } =
  configurationSlice.actions;

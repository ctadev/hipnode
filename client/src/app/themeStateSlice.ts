import { createSlice } from '@reduxjs/toolkit';

const initialState = { theme: false };

export const themeStateSlice = createSlice({
  name: 'themeState',
  initialState,
  reducers: {
    setThemeState: (state, action) => {
      state.theme = action.payload;
    },
    toggleThemeState: (state) => {
      state.theme = !state.theme;
    },
  },
});

export const { setThemeState, toggleThemeState } = themeStateSlice.actions;

export default themeStateSlice.reducer;

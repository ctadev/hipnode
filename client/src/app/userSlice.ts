import { createSlice } from '@reduxjs/toolkit';

const initialState: { isLoggedIn: boolean } = {
  isLoggedIn: localStorage.getItem('user') ? true : false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedinUser: (state) => ({ ...state, isLoggedIn: true }),
    logoutUser: (state) => ({ ...state, isLoggedIn: false }),
  },
});

// Action creators are generated for each case reducer function
export const { loggedinUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

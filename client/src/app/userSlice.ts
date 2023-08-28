import { createSlice } from '@reduxjs/toolkit';
import { ICurrentUser } from '../../types/index';

interface IState {
  currentUser: null | ICurrentUser;
}

const initialState: IState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedinUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
    logoutUser: (state) => ({ ...state, currentUser: null }),
  },
});

export const { loggedinUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

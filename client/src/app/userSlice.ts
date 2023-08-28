import { createSlice } from '@reduxjs/toolkit';
import { ICurrentUser } from '../../types/index';
import { getUserFromLocalStorage } from '../services/authService/userAuth';

export interface IUserState {
  currentUser: null | ICurrentUser;
}

const initialState: IUserState = {
  currentUser: getUserFromLocalStorage() ? getUserFromLocalStorage() : null,
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

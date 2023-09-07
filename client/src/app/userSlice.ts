import { createSlice } from '@reduxjs/toolkit';
import { ICurrentUser } from '../../types/index';
import { getUserFromLocalStorage } from '../services/authService/userAuth';

export interface IUserState {
  currentUser: ICurrentUser | null;
  registeredUser: {
    username: string;
    email: string;
    password: string;
  };
}

const initialState: IUserState = {
  currentUser: getUserFromLocalStorage() ? getUserFromLocalStorage() : null,
  registeredUser: {
    username: '',
    email: '',
    password: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
    logoutUser: (state) => ({ ...state, currentUser: null }),
    setRegisteredUser: (state, action) => ({
      ...state,
      registeredUser: {
        ...state.registeredUser,
        [action.payload.name]: action.payload.value,
      },
    }),
  },
});

export const { signinUser, logoutUser, setRegisteredUser } = userSlice.actions;

export default userSlice.reducer;

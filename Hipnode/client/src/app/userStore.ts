import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';

const reducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

export const store = configureStore({
  reducer,
});

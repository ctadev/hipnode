import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';
import themeReducer from './themeSlice';
import themeStateReducer from './themeStateSlice';

const reducer = combineReducers({
  user: userReducer,
  post: postReducer,
  theme: themeReducer,
  themeState: themeStateReducer,
});

export const store = configureStore({
  reducer,
});

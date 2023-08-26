import { createSlice } from '@reduxjs/toolkit';

interface PostState {
  postTitleQuery: string;
}

const initialState: PostState = {
  postTitleQuery: '',
};

export const userSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostTitleQuery: (state, action) => ({
      ...state,
      postTitleQuery: action.payload,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { setPostTitleQuery } = userSlice.actions;

export default userSlice.reducer;

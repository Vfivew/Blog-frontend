import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchTagPost = createAsyncThunk('posts/fetchTagPost', async ({tag, filter}) => {
  const { data } = await axios.get(`/posts/tags/filter?tag=${tag}&filter=${filter}`);
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagPost.pending, (state) => {
        state.posts.items = [];
        state.posts.status = 'loading';
      })
      .addCase(fetchTagPost.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = 'loaded';
      })
      .addCase(fetchTagPost.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = 'error';
      })
  },
});

export const tagsReducer = tagsSlice.reducer;

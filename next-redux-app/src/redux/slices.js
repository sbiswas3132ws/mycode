// src/redux/slices.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsersForSSR = createAsyncThunk(
    'data/fetchUsersForSSR',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        return users.sort((a, b) => a.name.localCompare(b.name));
    }
);

export const FetchPostsForSSG = createAsyncThunk(
    'data/fetchPostsForSSG',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        const processedPosts = posts.map(post => ({...post, date: new Date(post.id * 1000000000).toISOString(),
        }));
        return processedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
);


const dataSlice = createSlice({
  name: 'data',
  initialState: {
    ssrUsers: null,
    ssgPosts: null,
    ssrStatus: 'idle',
    ssgStatus: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersForSSR.pending, (state) => {
        state.ssrStatus = 'loading';
      })
      .addCase(fetchUsersForSSR.fulfilled, (state, action) => {
        state.ssrUsers = action.payload;
        state.ssrStatus = 'succeeded';
      })
      .addCase(fetchUsersForSSR.rejected, (state) => {
        state.ssrStatus = 'failed';
      })
      .addCase(fetchPostsForSSG.pending, (state) => {
        state.ssgStatus = 'loading';
      })
      .addCase(fetchPostsForSSG.fulfilled, (state, action) => {
        state.ssgPosts = action.payload;
        state.ssgStatus = 'succeeded';
      })
      .addCase(fetchPostsForSSG.rejected, (state) => {
        state.ssgStatus = 'failed';
      });
  },
});



// Example counter slice
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Export actions for use in components
export const { increment, decrement, reset } = counterSlice.actions;

// Export the reducer to be included in the store
export const dataReducer = dataSlice.reducer;
export const counterReducer =  counterSlice.reducer;


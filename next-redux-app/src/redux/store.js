// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { counterReducer, dataReducer }  from './slices';

// Configure and export the Redux store
export const store = configureStore({
  reducer: {
    counter: counterReducer, // Add your slices here
    data: dataReducer,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        thunk: true,
    }),
});


// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

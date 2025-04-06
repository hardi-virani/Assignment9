// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobReducer from './slices/jobSlice';
import userReducer from './slices/userSlice';

// Create store with all reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    users: userReducer
  }
});

export default store;
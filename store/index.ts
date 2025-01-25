'use client'
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  }
});

// Create a type for the AppDispatch, which you can use in your components
export type AppDispatch = typeof store.dispatch;

export default store;

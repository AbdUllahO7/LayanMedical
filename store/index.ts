'use client'
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import categoriesReducer from './admin/CategoriesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,

  }
});

// Create a type for the AppDispatch, which you can use in your components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

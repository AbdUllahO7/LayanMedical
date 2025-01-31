'use client'
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import categoriesReducer from './admin/CategoriesSlice';
import productsSlice from './admin/ProductsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productsSlice,
    
  }
});

// Create a type for the AppDispatch, which you can use in your components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

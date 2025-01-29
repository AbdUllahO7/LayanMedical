'use client'; // This should be the very first line of your file

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// Register User
export const registerUser = createAsyncThunk(
  "/auth/register/",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/register`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Inside your authSlice (assuming you're using TypeScript)
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login`,
            formData,
            { withCredentials: true }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
        }
    );
    

// Check Authentication
export const checkAuth = createAsyncThunk(
  "auth/checkAuth/",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/check-auth`, {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "/auth/logout/",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/logout`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;

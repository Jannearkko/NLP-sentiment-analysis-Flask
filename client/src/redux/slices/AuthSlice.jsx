// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isLimitReached: false,
    username: null,
    showLoginModal: false, // Add a state to control the visibility of the login modal
    showRegisterModal: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.showLoginModal = false; // Hide modal on successful login
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
    },
    setShowLoginModal: (state, action) => {
      state.showLoginModal = action.payload; // Control modal visibility
    },
    setShowRegisterModal: (state, action) => {
      state.showRegisterModal = action.payload;
    },
    limitReached: (state) => {
      state.isLimitReached = true;
    },
    resetLimitReached: (state) => {
      state.isLimitReached = false; // Reset the limit reached state
    }
  },
});

export const { loginSuccess, logout, setShowLoginModal, setShowRegisterModal, limitReached, resetLimitReached } = authSlice.actions;

export default authSlice.reducer;

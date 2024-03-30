// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isLimitReached: false,
    username: null,
    firstname: null,
    lastname: null,
    showLoginModal: false, // Add a state to control the visibility of the login modal
    showRegisterModal: false,
    modalState: 'none',
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
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
    },
    setModalState: (state, action) => {
      state.modalState = action.payload;
    }
  },
});

export const { loginSuccess, logout, setShowLoginModal, setShowRegisterModal, limitReached, resetLimitReached, setModalState } = authSlice.actions;

export default authSlice.reducer;

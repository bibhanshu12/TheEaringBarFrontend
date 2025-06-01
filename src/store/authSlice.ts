// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../models/type';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
interface AuthResponseData {
  user: User;
  token: string;
}

const loadInitialState = (): AuthState => {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return {
      user: user ? JSON.parse(user) : null,
      token: token,
      isAuthenticated: !!(user && token),
    };
  } catch {
    return { user: null, token: null, isAuthenticated: false };
  }
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponseData>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;

export default authSlice.reducer;
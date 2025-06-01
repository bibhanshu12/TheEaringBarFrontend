// src/store/services/authApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
import { setCredentials, logout as logoutAction } from '../authSlice';
import { User } from '../../models/type';

// Define interfaces for API responses
interface AuthResponse {
  success: boolean;
  msg: string;
  user: User;
  token: string;
}

interface MessageResponse {
  success: boolean;
  message: string;
}

// Request interfaces
interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface VerifyCodeRequest {
  email: string;
  code: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignUpRequest>({
      query: (credentials) => ({
        url: '/api/signup',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.user) {
            dispatch(setCredentials({ 
              user: data.user,
              token: data.token 
            }));
          }
        } catch (error) {
          console.error('Signup error:', error);
        }
      },
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/signin',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.user) {
            dispatch(setCredentials({ 
              user: data.user,
              token: data.token 
            }));
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),

    logout: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: '/api/signout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(logoutAction());
      },
    }),

    forgotPassword: builder.mutation<MessageResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: '/api/user/forgotpassword',
        method: 'POST',
        body,
      }),
    }),

    verifyCode: builder.mutation<MessageResponse, VerifyCodeRequest>({
      query: (body) => ({
        url: '/api/user/verifyCode',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { 
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
} = authApi;
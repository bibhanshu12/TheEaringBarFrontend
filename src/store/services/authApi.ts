// src/store/services/authApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
import { setCredentials, logout as logoutAction } from '../authSlice';
import { LoginResponse } from '../../models/type';

interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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
    signup: builder.mutation<LoginResponse, SignUpRequest>({
      query: (credentials) => ({
        url: '/api/signup',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.msg === "Signup Successful!" && data.user) {
            dispatch(setCredentials({ user: data.user }));
          }
        } catch (error) {
          console.error('Signup error:', error);
        }
      },
    }),

    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/api/signin',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.msg === "LoggedIn Successful!" && data.user) {
            dispatch(setCredentials({ user: data.user }));
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/api/signout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(logoutAction());
      },
    }),

    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordRequest>({
      query: (body) => ({
        url: '/api/user/forgotpassword',
        method: 'POST',
        body,
      }),
    }),

    verifyCode: builder.mutation<{ message: string }, VerifyCodeRequest>({
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
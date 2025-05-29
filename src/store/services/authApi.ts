// src/store/services/authApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
import { setCredentials, logout as logoutAction } from '../authSlice';
import { LoginResponse } from '../../models/types';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/signin',
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
        url: '/signout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(logoutAction());
      },
    }),
  }),
});

export const { 
  useLoginMutation,
  useLogoutMutation,
} = authApi;
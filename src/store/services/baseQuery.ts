import { 
  fetchBaseQuery, 
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import { logout } from '../authSlice';
import type { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    if (!headers.get('content-type')?.includes('multipart/form-data')) {
      headers.set('Content-Type', 'application/json');
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    // Token expired or invalid
    api.dispatch(logout());
  }
  
  return result;
};

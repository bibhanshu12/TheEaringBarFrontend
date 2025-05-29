
import { 
  fetchBaseQuery, 
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    if (!headers.get('content-type')?.includes('multipart/form-data')) {
      headers.set('Content-Type', 'application/json');
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQueryWithAuth(args, api, extraOptions);
     

  
  return result;
};










// src/store/services/baseQuery.ts
// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { logout } from '../authSlice';
// import type { RootState } from '../index';

// export const baseQueryWithAuth = fetchBaseQuery({
//   baseUrl: 'http://localhost:3000/api',
//   credentials: 'include',
//   prepareHeaders: (headers) => {
//     // Don't set Content-Type for FormData requests
//     if (!headers.get('content-type')?.includes('multipart/form-data')) {
//       headers.set('Content-Type', 'application/json');
//     }
//     return headers;
//   },
// });

// // Add auth error handling
// export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//   const result = await baseQueryWithAuth(args, api, extraOptions);
  
//   if (result.error && 'status' in result.error) {
//     // Handle auth errors
//     if (result.error.status === 401) {
//       // Token expired or invalid
//       api.dispatch(logout());
//     } else if (result.error.status === 403) {
//       // Not admin
//       api.dispatch(logout());
//     }
//   }
//   return result;
// };

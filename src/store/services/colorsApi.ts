import { createApi } from '@reduxjs/toolkit/query/react';
import {
  Color,
  ColorFormData,
  PaginatedResponse,
  ApiResponse
} from '../../models/type';
import { baseQueryWithReauth } from './baseQuery';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/category';
// fetchBaseQuery({ baseUrl: API_URL })

export const colorsApi = createApi({
  reducerPath: 'colorsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Colors'],
  endpoints: (builder) => ({
    getColors: builder.query<PaginatedResponse<Color>, {
      page?: number;
      limit?: number;
      search?: string;
    }>({
      query: (params = { page: 1, limit: 10 }) => ({
        url: '/api/category/getcolors',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Colors' as const, id })),
              { type: 'Colors', id: 'LIST' },
            ]
          : [{ type: 'Colors', id: 'LIST' }],
    }),

    getAllColors: builder.query<ApiResponse<Color[]>, void>({
      query: () => '/api/category/getcolors',
      providesTags: [{ type: 'Colors', id: 'LIST' }],
    }),

    getColorById: builder.query<ApiResponse<Color>, string>({
      query: (id) => `/api/category/colors/${id}`,
      providesTags: (result, error, id) => [{ type: 'Colors', id }],
    }),

    createColor: builder.mutation<ApiResponse<Color>, ColorFormData>({
      query: (color) => ({
        url: '/api/category/addcolor',
        method: 'POST',
        body: color,
      }),
      invalidatesTags: [{ type: 'Colors', id: 'LIST' }],
    }),

    updateColor: builder.mutation<ApiResponse<Color>, { id: string; data: ColorFormData }>({
      query: ({ id, data }) => ({
        url: `/api/category/colors/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Colors', id },
        { type: 'Colors', id: 'LIST' },
      ],
    }),

    deleteColor: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/api/category/colors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Colors', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetColorsQuery,
  useGetAllColorsQuery,
  useGetColorByIdQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorsApi;
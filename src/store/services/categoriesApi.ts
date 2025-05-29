import { createApi } from '@reduxjs/toolkit/query/react';
import { 
  Category, 
  CategoryFormData, 
  PaginatedResponse, 
  ApiResponse, 
  Product 
} from '../../models/type';
import { baseQueryWithReauth } from './baseQuery';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/category';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<PaginatedResponse<Category>, {
      page?: number;
      limit?: number;
      search?: string;
    }>({
      query: (params = { page: 1, limit: 10 }) => ({
        url: '/api/category/getcategory',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Categories' as const, id })),
              { type: 'Categories', id: 'LIST' },
            ]
          : [{ type: 'Categories', id: 'LIST' }],
    }),

    getAllCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => '/api/category/getcategory',
      providesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
 
    getCategoryById: builder.query<ApiResponse<Category>, string>({
      query: (id) => `/api/category/getcategory/${id}`,
      providesTags: (result, error, id) => [{ type: 'Categories', id }],
    }),

    createCategory: builder.mutation<ApiResponse<Category>, CategoryFormData>({
      query: (category) => ({
        url: '/api/category/add',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),

    updateCategory: builder.mutation<ApiResponse<Category>, { id: string; data: CategoryFormData }>({
      query: ({ id, data }) => ({
        url: `/category/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Categories', id },
        { type: 'Categories', id: 'LIST' },
      ],
    }),

    deleteCategory: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),

    getProductsByCategory: builder.query<ApiResponse<Product[]>, string>({
      query: (categoryId) => ({
        url: `api/category/products/category/${categoryId}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<Product[]>) => response,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductsByCategoryQuery,
} = categoriesApi;
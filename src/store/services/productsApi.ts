import { createApi } from '@reduxjs/toolkit/query/react';
import { 
  Product, 
  PaginatedResponse, 
  ApiResponse 
} from '../../models/type';
import { baseQueryWithReauth } from './baseQuery';
import { Offer } from '../../models/type';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// fetchBaseQuery({ baseUrl: API_URL })

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      PaginatedResponse<Product & { offer: Product['offers'] | null }>,
      {
        page?: number;
        limit?: number;
        search?: string;
        categoryId?: string;
      }
    >({
      query: (params = { page: 1, limit: 10 }) => ({
        url: '/allproducts',
        params: {
          ...params,
          include: 'offer,categories',
        },
      }),
      transformResponse: (
        response: ApiResponse<Product[]>,
        meta?: { response?: Response }
      ): PaginatedResponse<Product & { offer: Product['offers'] | null }> => {
        const mapped = response.data.map((product) => ({
          ...product,
          offer: product.offers ?? null,
        }));

        const total = meta?.response?.headers.get('X-Total-Count') 
          ? Number(meta.response.headers.get('X-Total-Count'))
          : mapped.length;

        const page = response.page ?? 1;
        const limit = response.limit ?? mapped.length;

        return {
          data: mapped,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => `/api/singleproduct/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    createProduct: builder.mutation<ApiResponse<Product>, FormData>({
      query: (formData) => ({
        url: '/addproduct',
        method: 'POST',
        body: formData,
        formData: true, // Important!
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    getProductColorsById: builder.query<ApiResponse<string[]>, string>({
      query: (id) => `/product/getcolors/${id}`,
      // you can optionally invalidate or provide tags here if needed
    }),

    updateProduct: builder.mutation<ApiResponse<Product>, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/updateproduct/${id}`,
        method: 'POST',
        body: data,
        // Don't set Content-Type header, browser will set it with boundary
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' },
      ],
    }),

    deleteProduct: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/delproduct/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' }
      ],
    }),
    updateProductColors: builder.mutation<
  ApiResponse<Product>, 
  { id: string; colors: Array<{ name: string; stock: number }> }
>({
  query: ({ id, colors }) => ({
    url: `/product/updatecolors/${id}`,
    method: 'PUT',
    body: { colors }
  }),
  invalidatesTags: (result, error, { id }) => [
    { type: 'Products', id },
    { type: 'Products', id: 'LIST' }
  ]
}),
    assignOfferToProduct: builder.mutation<
  { success: boolean; message: string; offer: Offer },
  { productId: string; offerId: string }
>({
  query: (data) => ({
    url: '/product/addoffer',
    method: 'POST',
    body: data,
  }),
  invalidatesTags: (result, error, { productId }) => [
    { type: 'Products', id: productId },
    { type: 'Products', id: 'LIST' }
  ],
}),
    getProductsByIds: builder.query<ApiResponse<Product[]>, string[]>({
      query: (ids) => ({
        url: '/api/products/batch',
        method: 'POST',
        body: { ids }
      }),
      // Or if you prefer GET method:
      // query: (ids) => `/api/products/batch?ids=${ids.join(',')}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    searchProducts: builder.query<ApiResponse<Product[]>, string>({
      query: (searchTerm) => ({
        url: `/api/products/search?q=${encodeURIComponent(searchTerm)}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
    getFreshDrops: builder.query<ApiResponse<Product[]>, void>({
      query: () => '/api/freshdrops',
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'FRESH_DROPS' },
            ]
          : [{ type: 'Products', id: 'FRESH_DROPS' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductColorsByIdQuery,
  useUpdateProductColorsMutation ,
  useAssignOfferToProductMutation,
  useGetProductsByIdsQuery,
  useSearchProductsQuery,
  useGetFreshDropsQuery,
} = productsApi;
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  Offer,
  OfferResponse,
  OfferFormData,
  PaginatedResponse,
  ApiResponse
} from '../../models/type';
import { baseQueryWithReauth } from './baseQuery';
export const offersApi = createApi({
  reducerPath: 'offersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Offers'],
  endpoints: (builder) => ({
    getOffers: builder.query<PaginatedResponse<Offer>, {
      page?: number;
      limit?: number;
      search?: string;
    }>({
      query: (params = { page: 1, limit: 10 }) => ({
        url: '/getoffer',
        params,
      }),
      providesTags: ['Offers'],
    }),

    getAllOffers: builder.query<ApiResponse<Offer[]>, void>({
      query: () => '/getoffer',
      providesTags: ['Offers'],
    }),

    createOffer: builder.mutation<ApiResponse<Offer>, OfferFormData>({
      query: (offer) => ({
        url: '/addoffer',
        method: 'POST',
        body: offer,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Offers'],
    }),

    updateOffer: builder.mutation<ApiResponse<Offer>, { id: string; data: Partial<Offer> }>({
      query: ({ id, data }) => ({
        url: `/updateoffer/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Offers', id },
        { type: 'Offers', id: 'LIST' }
      ],
    }),

    deleteOffer: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/deleteoffer/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Offers'],
    }),

    getOfferById: builder.query<OfferResponse, string>({
      query: (id) => `/getoffer/${id}`,
      transformResponse: (response: OfferResponse) => {
        // The response is already in the correct format
        return response;
      },
      providesTags: (result, error, id) => [{ type: 'Offers', id }],
    }),
  }),
});

export const {
  useGetOffersQuery,
  useGetAllOffersQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
  useGetOfferByIdQuery,
} = offersApi;
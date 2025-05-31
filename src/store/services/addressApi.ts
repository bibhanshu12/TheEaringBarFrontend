import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export interface Address {
  id: string;
  userId: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  state: string;
  label?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddressFormData {
  street: string;     // required
  zipCode: string;    // required
  city: string;       // required
  country: string;    // required
  state: string;      // required
  label?: string;     // optional
}

// Update the AddressResponse interface to match backend response
export interface AddressResponse {
  msg: string;
  allAddress: Address[];  // Changed from data to allAddress
}

export const addressApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "addressApi",
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getAddresses: builder.query<AddressResponse, void>({
      query: () => ({
        url: '/api/address/getUseraddress',
        method: 'GET',
      }),
      // Transform the response to ensure consistent data structure
      transformResponse: (response: AddressResponse) => ({
        msg: response.msg,
        allAddress: response.allAddress || []
      }),
      providesTags: ['Address'],
    }),

    addAddress: builder.mutation<Address, AddressFormData>({
      query: (address) => ({
        url: '/api/address/add',
        method: 'POST',
        body: address,
      }),
      invalidatesTags: ['Address'],
    }),

    updateAddress: builder.mutation<Address, { addressId: string; addressData: AddressFormData }>({
      query: ({ addressId, addressData }) => ({
        url: `/api/address/update/${addressId}`,
        method: 'PUT',
        body: addressData
      }),
      invalidatesTags: ['Address'],
    }),

    deleteAddress: builder.mutation<{ msg: string }, string>({
      query: (addressId) => ({
        url: `/api/address/delete/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
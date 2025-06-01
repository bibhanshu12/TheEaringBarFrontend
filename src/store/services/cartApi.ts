import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import {toast} from "react-toastify"

interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  colorId: string | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

interface CartResponse {
  status: string;
  getCartItems: CartItem[];
}

export interface AddToCartRequest {
  productId: string;
  colorId?: string;
  quantity: number;
}

interface DeleteCartItemRequest {
  cartItemId: string;
}

// New interface for update cart request
interface UpdateCartRequest {
  cartItemId: string;
  quantity: number;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    // Get cart items
    getCart: builder.query<CartResponse, void>({
      query: () => ({
        url: '/api/getcart',
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),

    // Add item to cart
    addToCart: builder.mutation<CartResponse, AddToCartRequest>({
      query: (body) => ({
        url: '/api/addcart',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.status === 'success') {
            toast.success('Item added to cart successfully');
          }
        } catch (error) {
          toast.error('Failed to add item to cart');
        }
      },
    }),

    // Delete item from cart
    deleteCartItem: builder.mutation<CartResponse, string>({
      query: (cartItemId) => ({
        url: '/api/deletecartitem',
        method: 'DELETE',
        body: { cartItemId },
      }),
      invalidatesTags: ['Cart'],
    }),
  })
});

// Export hooks for usage in components
export const {
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
} = cartApi;
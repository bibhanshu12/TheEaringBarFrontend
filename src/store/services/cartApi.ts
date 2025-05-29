import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  imageUrl: string;
}

interface CartResponse {
  status: number;
  message: string;
  data: CartItem[];
}

interface AddToCartRequest {
  productId: string;
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
    }),

    // Delete item from cart
    deleteCartItem: builder.mutation<CartResponse, DeleteCartItemRequest>({
      query: (body) => ({
        url: '/api/deletecartitem',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),

    // Update cart item
    updateCart: builder.mutation<CartResponse, UpdateCartRequest>({
      query: (body) => ({
        url: '/api/updatecart',
        method: 'PUT',
        body,
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
  useUpdateCartMutation,
} = cartApi;
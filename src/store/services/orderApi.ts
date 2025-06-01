import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  colorId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  cartId: string;
  addressId: string;
  totalAmount: number;
  finalAmount: number;
  offerId?: string;
  discountAmount?: number;
  status: "PENDING" | "CONFIRMED" | "PAID" | "CANCELLED" | "REFUNDED";
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Order","Cart"],
  endpoints: (builder) => ({
    getOrders: builder.query<{ success: boolean; orders: Order[] }, void>({
      query: () => ({
        url: '/api/order/getorders',
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    placeOrder: builder.mutation<{ success: boolean; order: Order }, { addressId: string }>({
      query: (body) => ({
        url: '/api/order/addorder',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    deleteOrder: builder.mutation<{ success: boolean; message: string }, string>({
      query: (orderId) => ({
        url: `/api/order/deleteorder/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),

    updateOrderStatus: builder.mutation<
      { success: boolean; message: string; order: Order },
      { orderId: string; status: Order['status'] }
    >({
      query: ({ orderId, status }) => ({
        url: `/api/order/updateorder/${orderId}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
    doNewsLetterMail: builder.mutation<{ success: boolean; message: string }, { email: string }>({
      query: (body) => ({
        url: '/api/newsletter/suscribe',
        method: 'POST',
        body,
      }),
    }),
    placeOrderAndMail: builder.mutation<{
      success: boolean;
      order: {
        id: string;
        userId: string;
        totalAmount: number;
        finalAmount: number;
        status: Order['status'];
        placedAt: string;
        items: Array<{
          product: {
            id: string;
            name: string;
            price: number;
            remainingStock: number;
          };
          color: string | null;
          quantity: number;
          price: number;
        }>;
      };
      upgradeProducts: Array<{
        id: string;
        name: string;
        description: string;
        price: number;
        stock: number;
      }>;
    }, { addressId: string }>({
      query: (body) => ({
        url: '/api/order/mailorder',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order', 'Cart'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  usePlaceOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
  useDoNewsLetterMailMutation,
  usePlaceOrderAndMailMutation,
} = orderApi;
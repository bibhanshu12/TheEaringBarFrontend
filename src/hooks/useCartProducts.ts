import { useMemo } from 'react';
import { useGetProductsByIdsQuery } from '../store/services/productsApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface ProductDetails {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: Array<{
    id: string;
    imageUrl: string;
    publicId: string;
    isDefault: boolean;
  }>;
}

export interface EnrichedCartItem extends CartItem {
  productDetails?: ProductDetails;
}

export const useCartProducts = (cartItems: CartItem[]) => {
  const productIds = useMemo(() => 
    Array.from(new Set(cartItems.map(item => item.productId))),
    [cartItems]
  );

  const { data: productsData, isLoading, error } = useGetProductsByIdsQuery(
    productIds.length > 0 ? productIds : skipToken
  );

  const productsMap = useMemo(() => {
    if (!productsData?.data) return {};
    return productsData.data.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {} as Record<string, ProductDetails>);
  }, [productsData]);

  const enrichedCartItems = useMemo(() => 
    cartItems.map(item => ({
      ...item,
      productDetails: productsMap[item.productId]
    })),
    [cartItems, productsMap]
  );

  const totalAmount = useMemo(() => 
    enrichedCartItems.reduce((total, item) => {
      const price = item.productDetails?.price || 0;
      return total + (price * item.quantity);
    }, 0),
    [enrichedCartItems]
  );

  // Add console log to debug
  console.log('Products Data:', productsData);
  console.log('Enriched Cart Items:', enrichedCartItems);

  return {
    enrichedCartItems,
    isLoading,
    error,
    totalAmount
  };
};
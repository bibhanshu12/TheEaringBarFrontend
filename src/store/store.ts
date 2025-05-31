import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import productsReducer from './features/productsSlice';
import authReducer from './authSlice';
import { authApi } from './services/authApi';  // Add this import
import { categoriesApi } from './services/categoriesApi';
import { productsApi } from './services/productsApi';
import { cartApi } from './services/cartApi';
import { colorsApi } from './services/colorsApi';
import { addressApi } from './services/addressApi';
import { orderApi } from './services/orderApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    [authApi.reducerPath]: authApi.reducer,  // Add authApi reducer
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [colorsApi.reducerPath]: colorsApi.reducer,
    [addressApi.reducerPath]:addressApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,  // Add authApi middleware
      categoriesApi.middleware,
      productsApi.middleware,
      cartApi.middleware,
      colorsApi.middleware,
      addressApi.middleware,
      orderApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

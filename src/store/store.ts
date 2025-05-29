import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import productsReducer from './features/productsSlice';
import { categoriesApi } from './services/categoriesApi';
import { productsApi } from './services/productsApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer, // Add productsApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      productsApi.middleware  // Add productsApi middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

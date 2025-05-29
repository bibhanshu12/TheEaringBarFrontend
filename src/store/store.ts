import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import productsReducer from './features/productsSlice';
import { categoriesApi } from './services/categoriesApi';
import { productsApi } from './services/productsApi';
import { cartApi } from './services/cartApi';
import { colorsApi } from './services/colorsApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer, // Add productsApi reducer
    [cartApi.reducerPath]: cartApi.reducer,
    [colorsApi.reducerPath]:colorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      productsApi.middleware,  // Add productsApi middleware
      cartApi.middleware,
      colorsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

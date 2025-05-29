import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './authSlice';
import { authApi } from './services/authApi';
import { productsApi } from './services/productsApi';
import { categoriesApi } from './services/categoriesApi';
import { colorsApi } from './services/colorsApi';
import { offersApi } from './services/offersApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [colorsApi.reducerPath]: colorsApi.reducer,
    [offersApi.reducerPath]: offersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      colorsApi.middleware,
      offersApi.middleware,
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apislice';
import authReducer from './slices/authSlice';
import appReducer from './slices/appSlice';
import sidebarReducer from './slices/sidebarSlice';
import userReducer from './slices/userSlice';

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      app: appReducer,
      sidebar: sidebarReducer,
      user: userReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(apiSlice.middleware),
  });
};

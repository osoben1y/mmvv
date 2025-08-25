import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../shared/slices/authSlice";
import favoritesReducer from "../shared/slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/user-slice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;

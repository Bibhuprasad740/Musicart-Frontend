import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import uiSlice from "./uiSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    ui: uiSlice.reducer,
    order: orderSlice.reducer,
  },
});

export default store;

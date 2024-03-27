import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllProductsApi } from "../backend_apis";

const initialState = {
  products: [],
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;

// custom action creators
export const getAllProducts = () => {
  return async (dispatch) => {
    dispatch(productActions.setIsLoading(true));

    const response = await axios.get(getAllProductsApi);

    dispatch(productActions.setProducts(response.data));

    dispatch(productActions.setIsLoading(false));
  };
};

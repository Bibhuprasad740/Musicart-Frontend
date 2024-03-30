import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllProductsApi } from "../backend_apis";

const initialState = {
  products: [],
  searchQuery: "",
  typeFilter: "",
  companyFilter: "",
  colorFilter: "",
  priceFilter: "",
  sortingFilter: "",
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
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setTypeFilter(state, action) {
      state.typeFilter = action.payload;
    },
    setCompanyFilter(state, action) {
      state.companyFilter = action.payload;
    },
    setColorFilter(state, action) {
      state.colorFilter = action.payload;
    },
    setPriceFilter(state, action) {
      state.priceFilter = action.payload;
    },
    setSortingFilter(state, action) {
      state.sortingFilter = action.payload;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;

// custom action creators
export const getAllProducts = ({
  searchQuery,
  typeFilter,
  companyFilter,
  colorFilter,
  priceFilter,
  sortingFilter,
}) => {
  return async (dispatch) => {
    dispatch(productActions.setIsLoading(true));

    const filters = {
      typeFilter,
      companyFilter,
      colorFilter,
      priceFilter,
      sortingFilter,
    };

    const params = {
      filters,
      searchQuery,
    };

    const response = await axios.get(getAllProductsApi, { params });

    dispatch(productActions.setProducts(response.data));

    dispatch(productActions.setIsLoading(false));
  };
};

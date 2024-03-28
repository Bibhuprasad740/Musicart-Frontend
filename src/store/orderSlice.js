import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { placeOrderApi } from "../backend_apis";

const initialState = {
  orders: [],
  isLoading: false,
  orderSuccessId: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setOrderSuccessId(state, action) {
      state.orderSuccessId = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;

// custom action creator
export const placeOrder = ({
  name,
  products,
  totalPrice,
  address,
  paymentMode,
  token,
}) => {
  return async (dispatch) => {
    dispatch(orderActions.setIsLoading(true));

    try {
      const body = {
        name,
        products,
        totalPrice,
        address,
        paymentMode,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(placeOrderApi, body, { headers });
      dispatch(orderActions.setOrderSuccessId(response.data));

      return response.data;
    } catch (error) {
      console.log("Error in orderSlice.placeOrder", error);
    }

    dispatch(orderActions.setIsLoading(false));
  };
};

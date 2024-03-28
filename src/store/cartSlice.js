import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchCartApi, updateCartApi } from "../backend_apis";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  userId: null,
  changed: false,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setChanged(state, action) {
      state.changed = action.payload;
    },
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      state.userId = action.payload.userId;
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.userId = null;
      state.changed = false;
      state.isLoading = false;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      state.totalQuantity++;
      state.totalPrice = (+state.totalPrice + +newItem.price).toString();
      state.changed = true;

      const existingItem = state.items.find(
        (cartItem) => cartItem.item === newItem._id
      );

      //   if item is a new item
      if (!existingItem) {
        state.items.push({
          item: newItem._id,
          quantity: 1,
        });
      } else {
        // existing item in cart
        existingItem.quantity += 1;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

// custom action creator
export const fetchCart = (token) => {
  return async (dispatch) => {
    dispatch(cartActions.setIsLoading(true));
    console.log(token);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(fetchCartApi, { headers });
      if (response.data) {
        dispatch(
          cartActions.replaceCart({
            items: response.data.items,
            totalQuantity: response.data.totalQuantity,
            totalPrice: response.data.totalPrice,
            userId: response.data.userId,
          })
        );
      }
    } catch (error) {
      console.log("Error in cartSlice.fetchCart", error);
    }

    dispatch(cartActions.setIsLoading(false));
  };
};

export const updateCart = (cart, token) => {
  console.log(token);
  return async (dispatch) => {
    dispatch(cartActions.setIsLoading(true));
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios.post(updateCartApi, cart, { headers });
    } catch (error) {
      console.log("Error in cartSlice.updateCart", error);
    }
    dispatch(cartActions.setIsLoading(true));
  };
};

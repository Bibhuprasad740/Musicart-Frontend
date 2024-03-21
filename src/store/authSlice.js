import { createSlice } from "@reduxjs/toolkit";
import Apis from "../backend_apis";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")).token
    : null,
  user: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")).user
    : null,
  error: null,
  message: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

export const signup = (name, phone, email, password) => {
  return async (dispatch) => {
    dispatch(authActions.setIsLoading(true));

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = {
        name,
        phone,
        email,
        password,
      };

      const response = await axios.post(Apis.signupApi, body, config);

      localStorage.setItem("auth", JSON.stringify(response.data));

      dispatch(authActions.setError(null));
      dispatch(authActions.setMessage("Login successful!"));

      window.location.href = "/";
    } catch (error) {
      console.log("Error in authSlice.signup", error);
      dispatch(authActions.setError("Can not create user!"));
    }

    dispatch(authActions.setIsLoading(false));
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    dispatch(authActions.setIsLoading(true));

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = {
        email,
        password,
      };

      const response = await axios.post(Apis.signinApi, body, config);

      localStorage.setItem("auth", JSON.stringify(response.data));

      dispatch(authActions.setError(null));
      dispatch(authActions.setMessage("Login successful!"));

      window.location.href = "/";
    } catch (error) {
      console.log("Error in authSlice.signin", error);
      dispatch(authActions.setError("Can not login!"));
    }

    dispatch(authActions.setIsLoading(false));
  };
};

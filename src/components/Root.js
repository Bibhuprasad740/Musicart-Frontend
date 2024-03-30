import React, { useEffect } from "react";
import classes from "./Root.module.css";

import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/productSlice";
import { fetchCart, updateCart } from "../store/cartSlice";

let isInitial = true;

const Root = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token);
  const searchQuery = useSelector((state) => state.product.searchQuery);
  const typeFilter = useSelector((state) => state.product.typeFilter);
  const companyFilter = useSelector((state) => state.product.companyFilter);
  const colorFilter = useSelector((state) => state.product.colorFilter);
  const priceFilter = useSelector((state) => state.product.priceFilter);
  const sortingFilter = useSelector((state) => state.product.sortingFilter);

  useEffect(() => {
    dispatch(
      getAllProducts({
        searchQuery,
        typeFilter,
        companyFilter,
        colorFilter,
        priceFilter,
        sortingFilter,
      })
    );
  }, [
    dispatch,
    searchQuery,
    typeFilter,
    companyFilter,
    colorFilter,
    priceFilter,
    sortingFilter,
  ]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (!cart.changed) {
      return;
    }
    console.log("Effect running in root..");

    dispatch(updateCart(cart, token));
  }, [cart, dispatch, token]);
  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;

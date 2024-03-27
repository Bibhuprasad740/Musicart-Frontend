import React from "react";
import classes from "./CartItem.module.css";

const CartItem = ({ product }) => {
  return (
    <div className={classes.cartItem}>
      <img src={product.imageUrls[0]} alt="" />
    </div>
  );
};

export default CartItem;

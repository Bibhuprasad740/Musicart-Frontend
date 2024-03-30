import React, { useState } from "react";
import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const quantityChangeHandler = (event) => {
    setQuantity(event.target.value);
    dispatch(
      cartActions.changeQuantity({
        item: product,
        quantity: parseInt(event.target.value),
      })
    );
  };
  return (
    <div className={classes.cartItem}>
      <div className={classes.imageSection}>
        {/* image */}
        <section className={classes.imageContainer}>
          <img src={product.imageUrls[0]} alt="" />
        </section>
      </div>
      <div className={classes.detailsSection}>
        {/* details */}
        <section className={classes.detailsContainer}>
          <p className={classes.heading}>{product.name}</p>
          <span>Color: </span>
          <span className={classes.details}>{product.color}</span>
          <p>In Stock</p>
        </section>
        {/* price */}
        <section className={classes.priceSection}>
          <p className={classes.heading}>Price</p>
          <p className={classes.heading}>{`₹ ${product.price}`}</p>
        </section>

        {/* quantity */}
        <section className={classes.quantitySection}>
          <p className={classes.heading}>Quantity</p>
          <select
            value={quantity}
            className={classes.quantity}
            onChange={quantityChangeHandler}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </section>

        {/* total */}
        <section className={classes.totalSection}>
          <p className={classes.heading}>Total</p>
          <p className={classes.heading}>{`₹ ${product.price * quantity}`}</p>
        </section>
      </div>
    </div>
  );
};

export default CartItem;

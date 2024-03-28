import React from "react";

import classes from "./DetailsSection.module.css";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const DetailsSection = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart(product));
  };
  const buyNowHandler = () => {
    dispatch(cartActions.addItemToCart(product));
    navigate("/cart");
  };
  return (
    <div className={classes.detailsSection}>
      <p className={classes.name}>{product.name}</p>
      <Rating rating={3.5} total={50} />
      <p className={classes.price}>{`Price -₹${product.price}`}</p>
      <p
        className={classes.color}
      >{`${product.color} | ${product.type} earphone`}</p>
      <p className={classes.description}>{product.description}</p>
      <p className={classes.about}>About this item</p>
      <ul className={classes.features}>
        {product.features.map((feature, index) => (
          <li className={classes.feature} key={index}>
            {feature}
          </li>
        ))}
      </ul>
      <p className={classes.details}>Available - In Stock</p>
      <p className={classes.details}>{`Brand - ${product.brand}`}</p>

      {/* Add to cart button */}
      <button className={classes.cartButton} onClick={addToCartHandler}>
        Add to cart
      </button>
      <button className={classes.buyButton} onClick={buyNowHandler}>
        Buy Now
      </button>
    </div>
  );
};

export default DetailsSection;

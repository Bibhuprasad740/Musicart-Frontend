import React from "react";
import classes from "./Product.module.css";

import { FaShoppingCart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { toast } from "react-hot-toast";

const Product = ({ product, isGridView }) => {
  const dispatch = useDispatch();

  const getHeadphoneType = (type) => {
    if (type === "inear") {
      return "In Ear";
    } else if (type === "onear") {
      return "On Ear";
    } else {
      return "Over Ear";
    }
  };

  const navigate = useNavigate();
  const navigateToProductDetaisPage = () => {
    navigate(`/products/${product._id}`);
  };

  const addItemToCartHandler = (event) => {
    event.stopPropagation();
    dispatch(cartActions.addItemToCart(product));
    toast.success("Product added to cart!");
  };

  return (
    <div className={isGridView ? classes.productGrid : classes.productList}>
      <div className={classes.imageSection}>
        <img
          onClick={navigateToProductDetaisPage}
          className={isGridView ? classes.image : classes.imageList}
          src={product.imageUrls[0]}
          alt=""
        />
        <div className={classes.cartIcon} onClick={addItemToCartHandler}>
          <FaShoppingCart />
        </div>
      </div>
      <div
        className={
          isGridView ? classes.productDetails : classes.productDetailsList
        }
      >
        {/* change it to product.id */}
        <NavLink to={`/products/${product._id}`}>
          <p
            className={classes.productName}
          >{`${product.brand} | ${product.name}`}</p>
        </NavLink>
        <p className={classes.productPrice}>{`Price - ₹ ${product.price}`}</p>
        {!isGridView && (
          <p className={classes.productDescription}>{product.description}</p>
        )}
        <p className={classes.name}>{`Earphone Type - ${getHeadphoneType(
          product.type
        )}`}</p>
        {!isGridView && (
          <button
            className={classes.detailsButton}
            onClick={navigateToProductDetaisPage}
          >
            Details
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;

import React from "react";
import classes from "./Product.module.css";

import { FaShoppingCart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Product = ({ product, isGridView }) => {
  const navigate = useNavigate();
  const navigateToProductDetails = (product) => {
    navigate(`/products/${product.name}`);
  };

  const getHeadphoneType = (type) => {
    if (type === "inear") {
      return "In Ear";
    } else if (type === "onear") {
      return "On Ear";
    } else {
      return "Over Ear";
    }
  };

  return (
    <div
      onClick={navigateToProductDetails}
      className={isGridView ? classes.productGrid : classes.productList}
    >
      <div className={classes.imageSection}>
        <img
          className={isGridView ? classes.image : classes.imageList}
          src={product.imageUrls[0]}
          alt=""
        />
        <div className={classes.cartIcon}>
          <FaShoppingCart />
        </div>
      </div>
      <div
        className={
          isGridView ? classes.productDetails : classes.productDetailsList
        }
      >
        {/* change it to product.id */}
        <NavLink to={`products/${product.name}`}>
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
          <button className={classes.detailsButton}>Details</button>
        )}
      </div>
    </div>
  );
};

export default Product;

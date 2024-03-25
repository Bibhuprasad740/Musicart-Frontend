import React from "react";
import classes from "./Product.module.css";

import { FaShoppingCart } from "react-icons/fa";

const Product = ({ product, isGridView }) => {
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
    <div className={isGridView ? classes.productGrid : classes.productList}>
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
        <p
          className={classes.productName}
        >{`${product.brand} | ${product.name}`}</p>
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

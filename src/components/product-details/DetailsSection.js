import React from "react";

import classes from "./DetailsSection.module.css";
import Rating from "./Rating";

const DetailsSection = ({ product }) => {
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
        {product.features.map((feature) => (
          <li className={classes.feature}>{feature}</li>
        ))}
      </ul>
      <p className={classes.details}>Available - In Stock</p>
      <p className={classes.details}>{`Brand - ${product.brand}`}</p>

      {/* Add to cart button */}
      <button className={classes.cartButton}>Add to cart</button>
      <button className={classes.buyButton}>Buy Now</button>
    </div>
  );
};

export default DetailsSection;

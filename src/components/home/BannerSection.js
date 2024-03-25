import React from "react";
import classes from "./BannerSection.module.css";

import girl from "../../assets/girl.png";

const BannerSection = () => {
  return (
    <section className={classes.bannerSection}>
      <div className={classes.ad}>
        <p className={classes.text}>
          Grab upto 50% off on<br></br> Selected headphones
        </p>
        <button className={classes.buyButton}>Buy Now</button>
      </div>
      <img className={classes.girl} src={girl} alt="girl.png" />
    </section>
  );
};

export default BannerSection;

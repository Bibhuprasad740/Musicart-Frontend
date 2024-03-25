import React from "react";
import classes from "./ProductDetailsPage.module.css";
import MobileHeader from "../MobileHeader";
import DesktopHeader from "../DesktopHeader";
import NavigationSection from "../NavigationSection";

const ProductDetailsPage = () => {
  return (
    <div className={classes.productDetailsPage}>
      <section className={classes.headerSection}>
        <div className={classes.mobile}>
          <MobileHeader />
        </div>
        <div className={classes.desktop}>
          <DesktopHeader />
        </div>
      </section>

      <div className={classes.main}>
        <NavigationSection />
      </div>
    </div>
  );
};

export default ProductDetailsPage;

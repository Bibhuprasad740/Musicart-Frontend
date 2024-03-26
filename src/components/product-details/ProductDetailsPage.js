import React, { useEffect } from "react";
import classes from "./ProductDetailsPage.module.css";
import MobileHeader from "../MobileHeader";
import DesktopHeader from "../DesktopHeader";
import NavigationSection from "../NavigationSection";

import { DUMMY_PRODUCTS } from "../../dummy_data";
import BackButton from "../reusables/BackButton";
import ImageSection from "./ImageSection";
import DetailsSection from "./DetailsSection";

const ProductDetailsPage = () => {
  const product = DUMMY_PRODUCTS[9];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <BackButton backTo="Products" redirectTo="/" />

        {/* product name and description */}
        <p
          className={classes.productHeading}
        >{`${product.name}, ${product.description} (${product.color})`}</p>

        {/* Product image and details */}
        <div className={classes.productMain}>
          {/* Product image */}
          <div className={classes.imageSection}>
            <ImageSection images={product.imageUrls} />
          </div>

          {/* Product details */}
          <div className={classes.detailsSection}>
            <DetailsSection product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

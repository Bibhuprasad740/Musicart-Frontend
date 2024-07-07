import React, { useEffect, useState } from "react";
import classes from "./ProductDetailsPage.module.css";
import MobileHeader from "../MobileHeader";
import DesktopHeader from "../DesktopHeader";
import NavigationSection from "../NavigationSection";

import BackButton from "../reusables/BackButton";
import ImageSection from "./ImageSection";
import DetailsSection from "./DetailsSection";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getProductApi } from "../../backend_apis";
import LoadingProgressBar from "../reusables/LoadingProgressBar";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${getProductApi}/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.log("Error in fetching product", error);
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [productId]);

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

      {isLoading ? (
        <LoadingProgressBar />
      ) : product ? (
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
      ) : <p>Can not get product</p>}
    </div>
  );
};

export default ProductDetailsPage;

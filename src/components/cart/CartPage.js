import React, { useEffect, useState } from "react";
import classes from "./CartPage.module.css";
import MobileHeader from "../MobileHeader";
import DesktopHeader from "../DesktopHeader";
import NavigationSection from "../NavigationSection";
import BackButton from "../reusables/BackButton";

import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import axios from "axios";
import { getProductApi } from "../../backend_apis";
import CartItem from "./CartItem";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const productRequests = cart.items.map(async (cartItem) => {
          const response = await axios.get(`${getProductApi}/${cartItem.item}`);
          return { ...response.data, quantity: cartItem.quantity };
        });

        const fetchedProducts = await Promise.all(productRequests);
        console.log(fetchedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }

      setIsLoading(false);
    };

    fetchProducts();
  }, [cart.items]);

  return (
    <div className={classes.cartPage}>
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
        <div className={classes.cartMain}>
          {/* My cart text and cart icon */}
          <div className={classes.cartHeader}>
            <PiSuitcaseSimpleLight size={40} />
            <p className={classes.headerTitle}>My Cart</p>
          </div>

          {/* cart details */}
          {isLoading ? (
            <div></div>
          ) : (
            <div className={classes.detailsMain}>
              {/* cart items */}
              <div className={classes.productsSection}>
                {products.map((prod) => (
                  <CartItem key={prod._id} product={prod} />
                ))}
              </div>

              {/* price details */}
              <div className={classes.priceSection}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

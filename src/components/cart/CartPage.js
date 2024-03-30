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
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigateToCheckoutPage = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const productRequests = cart.items.map(async (cartItem) => {
          const response = await axios.get(`${getProductApi}/${cartItem.item}`);
          return { ...response.data, quantity: cartItem.quantity };
        });

        const fetchedProducts = await Promise.all(productRequests);
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
        {cart.items.length === 0 ? (
          <div className={classes.noProduct}>
            <p>No products in cart!</p>
          </div>
        ) : (
          <div className={classes.cartMain}>
            {/* My cart text and cart icon */}
            <div className={classes.cartHeader}>
              <PiSuitcaseSimpleLight size={40} />
              <p className={classes.headerTitle}>My Cart</p>
            </div>

            {/* cart details */}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className={classes.detailsMain}>
                {/* cart items */}
                <div className={classes.productsSection}>
                  {products.map((prod) => (
                    <CartItem key={prod._id} product={prod} />
                  ))}
                </div>
                {/* price details */}
                <div className={classes.priceSection}>
                  <p className={classes.heading}>PRICE DETAILS</p>
                  <div className={classes.detailsSection}>
                    {/* total mrp */}
                    <div className={classes.detailsBox}>
                      <p className={classes.detailsKey}>Total MRP</p>
                      <p
                        className={classes.detailsValue}
                      >{`₹ ${cart.totalPrice}`}</p>
                    </div>

                    {/* discount on mrp */}
                    <div className={classes.detailsBox}>
                      <p className={classes.detailsKey}>Discount on MRP</p>
                      <p className={classes.detailsValue}>₹ 0</p>
                    </div>

                    {/* convinience fee */}
                    <div className={classes.detailsBox}>
                      <p className={classes.detailsKey}>Convenience Fee</p>
                      <p className={classes.detailsValue}>₹ 45</p>
                    </div>

                    {/* divider */}
                    <div className={classes.divider}></div>

                    {/* total price */}
                    <div className={classes.totalBox}>
                      <p className={classes.detailsKey}>Total Price</p>
                      <p className={classes.detailsValue}>
                        {`₹ ${+cart.totalPrice + 45}`}
                      </p>
                    </div>

                    {/* Place order button */}
                    <button
                      className={classes.orderButton}
                      onClick={navigateToCheckoutPage}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* overview section */}
        {cart.items.length !== 0 && (
          <div className={classes.overview}>
            <p className={classes.detailsValue}>{`${cart.totalQuantity} ${
              cart.totalQuantity > 1 ? "Items" : "Item"
            }`}</p>
            <p className={classes.detailsValue}>{`₹ ${cart.totalPrice}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

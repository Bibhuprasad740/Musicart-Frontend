import React, { useEffect, useState } from "react";
import classes from "./CheckoutPage.module.css";
import MobileHeader from "../MobileHeader";
import DesktopHeader from "../DesktopHeader";
import NavigationSection from "../NavigationSection";
import BackButton from "../reusables/BackButton";

import { useSelector } from "react-redux";
import axios from "axios";
import { getAddressesApi, getProductApi } from "../../backend_apis";
import { useNavigate } from "react-router-dom";
// import AddAddressModal from "./AddAddressModal";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Mode of payment");
  const [showOptions, setShowOptions] = useState(false);
  // const [addresses, setAddresses] = useState([]);
  // const [selectedAddress, setSelectedAddress] = useState(null);
  // const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isAddressLoading, setIsAddressLoading] = useState(false);

  const navigateToCheckoutPage = () => {
    navigate("/checkout");
  };

  const addressChangeHandler = (event) => {
    console.log(event.target.value);
    setAddress(event.target.value);
  };

  const toggleOptionsHandler = () => {
    setShowOptions((state) => !state);
  };

  const selectPaymentMethodHandle = (method) => {
    setPaymentMethod(method);
    setShowOptions(false);
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

  // will do it later...
  // useEffect(() => {
  //   const fetchUserAddresses = async () => {
  //     setIsAddressLoading(true);

  //     try {
  //       const headers = {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       };
  //       const response = await axios.get(`${getAddressesApi}/${user._id}`, {
  //         headers,
  //       });
  //       setAddresses(response.data);
  //     } catch (error) {
  //       console.log("Can not load addresses!", error);
  //     }

  //     setIsAddressLoading(false);
  //   };

  //   fetchUserAddresses();
  // }, [user._id, token]);

  // const showAddAddressModalHandler = () => {
  //   setShowAddAddressModal(true);
  // };

  // const closeAddAddressModalHandler = () => {
  //   setShowAddAddressModal(false);
  // };

  return (
    <div className={classes.checkoutPage}>
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
        <BackButton backTo="Cart" redirectTo="/cart" />
        <div className={classes.checkoutMain}>
          {/* My cart text and cart icon */}
          <div className={classes.checkoutHeader}>
            <p className={classes.headerTitle}>Checkout</p>
          </div>

          {/* cart details */}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className={classes.detailsMain}>
              {/* product details */}
              <div className={classes.productsSection}>
                {/* info box for address */}
                <section className={classes.infoBox}>
                  <p className={classes.redHeading}>1. Delivery Address</p>
                  <div>
                    <p className={classes.name}>{user.name}</p>
                    <textarea
                      className={classes.userAddress}
                      placeholder="Enter your address"
                      name="address"
                      rows="3"
                      value={address}
                      onChange={addressChangeHandler}
                    ></textarea>
                  </div>
                </section>
                {/* divider */}
                <div className={classes.divider}></div>

                {/*info box for payment */}
                <section className={classes.infoBox}>
                  <p className={classes.redHeading}>2. Payment Method</p>
                  <div
                    className={classes.paymentBox}
                    onClick={toggleOptionsHandler}
                  >
                    <p>{paymentMethod}</p>
                  </div>
                  {showOptions && (
                    <div className={classes.options}>
                      <p
                        className={classes.option}
                        onClick={() =>
                          selectPaymentMethodHandle("Pay on delivery")
                        }
                      >
                        Pay on delivery
                      </p>
                      <p
                        className={classes.option}
                        onClick={() => selectPaymentMethodHandle("UPI")}
                      >
                        UPI
                      </p>
                      <p
                        className={classes.option}
                        onClick={() => selectPaymentMethodHandle("Card")}
                      >
                        Card
                      </p>
                    </div>
                  )}
                </section>
                {/* divider */}
                <div className={classes.divider}></div>

                {/* info box for Review items */}
                <section className={classes.reviewBox}>
                  <p className={classes.redHeading}>
                    3. Review items and delivery
                  </p>
                  <div className={classes.imageSection}>
                    {products.map((product) => (
                      <img
                        className={classes.image}
                        src={product.imageUrls[0]}
                        key={product._id}
                        alt=""
                      />
                    ))}
                  </div>
                </section>
                {/* divider */}
                <div className={classes.divider}></div>
              </div>

              {/* price details */}
              <div className={classes.priceSection}>
                <div className={classes.detailsSection}>
                  {/* Place order button */}
                  <button
                    className={classes.topOrderButton}
                    onClick={navigateToCheckoutPage}
                  >
                    Place Your Order
                  </button>
                  <p className={classes.policy}>
                    By placing your order, you agree to Musicart privacy notice
                    and conditions of use.
                  </p>
                  {/* total mrp */}
                  <p className={classes.heading}>Order Summary</p>
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
                  <button
                    className={classes.bottomOrderButton}
                    onClick={navigateToCheckoutPage}
                  >
                    Place Your Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* overview section */}
        <div className={classes.overview}>
          <button
            className={classes.overviewButton}
            onClick={navigateToCheckoutPage}
          >
            Place Your Order
          </button>
          <div className={classes.overviewDetails}>
            <p className={classes.overviewHeading}>{`Order Total: ₹${
              +cart.totalPrice + 45
            }`}</p>
            <p className={classes.policy}>
              By placing your order, you agree to Musicart privacy notice and
              conditions of use.
            </p>
          </div>
        </div>
      </div>
      {/* {showAddAddressModal && (
        <AddAddressModal onClose={closeAddAddressModalHandler} />
      )} */}
    </div>
  );
};

export default CheckoutPage;

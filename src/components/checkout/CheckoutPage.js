import React, { useEffect, useState } from "react";
import classes from "./CheckoutPage.module.css";
import MobileHeader from "../MobileHeader";
import DesktopHeader from "../DesktopHeader";
import NavigationSection from "../NavigationSection";
import BackButton from "../reusables/BackButton";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getProductApi } from "../../backend_apis";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/use-input";
import { placeOrder } from "../../store/orderSlice";
import { cartActions } from "../../store/cartSlice";
import { toast } from "react-hot-toast";
// import AddAddressModal from "./AddAddressModal";

const validateAddress = (address) => {
  return address.trim().length > 0;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isPlacingOrder = useSelector((state) => state.order.isLoading);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentMode, setPaymentMode] = useState("Mode of payment");
  const [showOptions, setShowOptions] = useState(false);
  // const [addresses, setAddresses] = useState([]);
  // const [selectedAddress, setSelectedAddress] = useState(null);
  // const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isAddressLoading, setIsAddressLoading] = useState(false);

  const {
    value: addressValue,
    isValid: isAddressValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlueHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(validateAddress);

  const navigateToCheckoutPage = () => {
    navigate("/checkout");
  };

  const toggleOptionsHandler = () => {
    setShowOptions((state) => !state);
  };

  const selectPaymentModeHandle = (method) => {
    setPaymentMode(method);
    setShowOptions(false);
  };

  const isPaymentModeValid = paymentMode !== "Mode of payment";

  let orderIsValid = false;

  if (isAddressValid && isPaymentModeValid) {
    orderIsValid = true;
  }

  const getAbbr = (paymentMode) => {
    if (paymentMode === "Pay on delivery") {
      return "POD";
    } else if (paymentMode === "Card") {
      return "CARD";
    }
    return paymentMode;
  };

  const orderPlaceHandler = async () => {
    if (!orderIsValid) {
      if (!isAddressValid) {
        toast.error("Please add a valid address!");
      } else {
        toast.error("Please select a payment option!");
      }
      return;
    }

    const paymentModeAbbr = getAbbr(paymentMode);
    // place order
    const orderId = await dispatch(
      placeOrder({
        name: user.name,
        products,
        totalPrice: cart.totalPrice,
        address: addressValue,
        paymentMode: paymentModeAbbr,
        token,
      })
    );
    dispatch(cartActions.clearCart());
    resetAddress();
    navigate(`/orders/${orderId}`);
    toast.success("Order Placed successfully!");
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
                      className={
                        addressHasError
                          ? `${classes.userAddress} ${classes.invalid}`
                          : classes.userAddress
                      }
                      placeholder="Enter your address"
                      name="address"
                      rows="3"
                      value={addressValue}
                      onChange={addressChangeHandler}
                      onBlur={addressBlurHandler}
                    ></textarea>
                    {addressHasError && (
                      <p className={classes.error}>*Required field</p>
                    )}
                  </div>
                </section>
                {/* divider */}
                <div className={classes.divider}></div>

                {/*info box for payment */}
                <section className={classes.infoBox}>
                  <p className={classes.redHeading}>2. Payment Method</p>
                  <div
                    className={
                      !isPaymentModeValid
                        ? `${classes.paymentBox} ${classes.invalid}`
                        : classes.paymentBox
                    }
                    onClick={toggleOptionsHandler}
                  >
                    <p>{paymentMode}</p>
                  </div>
                  {showOptions && (
                    <div className={classes.options}>
                      <p
                        className={classes.option}
                        onClick={() =>
                          selectPaymentModeHandle("Pay on delivery")
                        }
                      >
                        Pay on delivery
                      </p>
                      <p
                        className={classes.option}
                        onClick={() => selectPaymentModeHandle("UPI")}
                      >
                        UPI
                      </p>
                      <p
                        className={classes.option}
                        onClick={() => selectPaymentModeHandle("Card")}
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
                  <div>
                    <div className={classes.imageSection}>
                      {products.map((product) => (
                        <img
                          className={
                            selectedProduct?._id !== product._id
                              ? classes.image
                              : `${classes.image} ${classes.selected}`
                          }
                          src={product.imageUrls[0]}
                          key={product._id}
                          onClick={() => setSelectedProduct(product)}
                          alt=""
                        />
                      ))}
                    </div>

                    {/* selected item details */}
                    {selectedProduct && (
                      <div style={{ marginTop: "20px" }}>
                        <p className={classes.heading}>
                          {selectedProduct.name}
                        </p>
                        <p className={classes.detailsKey}>
                          {`Color: ${selectedProduct.color} | Quantity: ${selectedProduct.quantity}`}
                        </p>
                        <p className={classes.detailsKey}>
                          Estimated Delivery:
                        </p>
                        <p className={classes.detailsKey}>
                          Monday - Free Standard Delivery
                        </p>
                      </div>
                    )}
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
                    onClick={orderPlaceHandler}
                  >
                    {isPlacingOrder ? "Loading..." : "Place Your Order"}
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
                    onClick={orderPlaceHandler}
                  >
                    {isPlacingOrder ? "Loading..." : "Place Your Order"}
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
            {isPlacingOrder ? "Loading..." : "Place Your Order"}
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

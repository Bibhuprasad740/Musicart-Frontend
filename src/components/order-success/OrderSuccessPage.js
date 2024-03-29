import React from "react";
import classes from "./OrderSuccessPage.module.css";
import MobileHeader from "../MobileHeader";

import logo from "../../assets/logo.png";
import success from "../../assets/success.png";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const navigateToHomeScreen = () => {
    navigate("/");
  };
  return (
    <div className={classes.orderSuccessPage}>
      <section className={classes.headerSection}>
        <div className={classes.mobile}>
          <MobileHeader />
        </div>
      </section>
      <div className={classes.main}>
        <img className={classes.headerImage} src={logo} alt="logo.png" />
        <div className={classes.successSection}>
          <div className={classes.successBox}>
            <img src={success} alt="success.png" />
            <p className={classes.heading}>Order Placed Successfully!</p>
            <p className={classes.subHeading}>
              You will be receiving a confirmation email with order details.
            </p>
            <button
              className={classes.backButton}
              onClick={navigateToHomeScreen}
            >
              Go back to Home page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

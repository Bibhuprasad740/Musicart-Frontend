import React, { useState } from "react";
import classes from "./NavigationSection.module.css";

import logo from "../assets/logo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { GrCart } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { cartActions } from "../store/cartSlice";

const NavigationSection = () => {
  const auth = useSelector((state) => state.auth);
  const cartSize = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [showOptions, setShowOptions] = useState(false);

  const accountClickHandler = () => {
    setShowOptions((state) => !state);
  };

  const logoutHandler = () => {
    dispatch(cartActions.clearCart());
    dispatch(authActions.logout());
  };

  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate("/cart");
  };

  const getNameAbbr = (name) => {
    let abbr = "";
    const words = name.split(" ");
    words.map((word) => (abbr += word[0].toUpperCase()));
    return abbr;
  };
  const getPath = () => {
    return "/ " + pathname.split("/")[1].toUpperCase();
  };
  return (
    <section className={classes.navigationSection}>
      {/* logo and navigation */}
      <div className={classes.leftPortion}>
        <img className={classes.image} src={logo} alt="logo.png" />
        <NavLink to="/">
          <p className={classes.action}>Home</p>
        </NavLink>

        {pathname === "/" ? (
          <NavLink to="/invoices">
            <p className={classes.action}>Invoices</p>
          </NavLink>
        ) : (
          <p className={classes.action}>{getPath()}</p>
        )}
      </div>

      {/* cart and account */}
      <div className={classes.rightPortion}>
        {/* cart */}
        <div className={classes.cart} onClick={navigateToCart}>
          <GrCart color="white" size={25} />
          <p>View Cart</p>
          <p>{cartSize}</p>
        </div>
        {/* Account */}
        {auth.user && (
          <>
            <div onClick={accountClickHandler} className={classes.account}>
              <p className={classes.action}>{getNameAbbr(auth.user.name)}</p>
            </div>
            {showOptions && (
              <ul className={classes.accountOptions}>
                <li className={classes.accountOption}>{auth.user.name}</li>
                <li className={classes.accountOption}>
                  <NavLink to="/" onClick={logoutHandler}>
                    Logout
                  </NavLink>
                </li>
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default NavigationSection;

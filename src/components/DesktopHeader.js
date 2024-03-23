import React from "react";
import classes from "./DesktopHeader.module.css";

import { useDispatch, useSelector } from "react-redux";
import phoneIcon from "../assets/phoneIcon.png";
import { NavLink, useLocation } from "react-router-dom";
import { authActions } from "../store/authSlice";

const DesktopHeader = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return pathname !== "/signup" && pathname !== "/signin" ? (
    <div className={classes.desktopHeader}>
      <section className={classes.logoSection}>
        <img src={phoneIcon} alt="phoneIcon.png" />
        <p className={classes.text}>+91 7735605546</p>
      </section>
      <p className={classes.text}>Get 50% off on selected items | Shop Now</p>
      <section className={classes.navigation}>
        {!token && (
          <div className={classes.authButtons}>
            <NavLink to="/signin">
              <p className={classes.text}>Login</p>
            </NavLink>
            <p className={classes.text}> | </p>
            <NavLink to="/signup">
              <p className={classes.text}>Register</p>
            </NavLink>
          </div>
        )}
        {token && (
          <NavLink to="/">
            <p onClick={logoutHandler} className={classes.text}>
              Logout
            </p>
          </NavLink>
        )}
      </section>
    </div>
  ) : (
    <div></div>
  );
};

export default DesktopHeader;

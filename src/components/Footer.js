import React, { useEffect, useState } from "react";
import classes from "./Footer.module.css";

import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

const color = "#2e0052";
const size = 20;

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const auth = useSelector((state) => state.auth);

  const [selectedTab, setSelectedTab] = useState(0);

  const selectTabHandler = (tab) => {
    setSelectedTab(tab);
    switch (tab) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/cart");
        break;
      case 2:
        navigate("/invoices");
        break;
      default:
        navigate("/");
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/":
        setSelectedTab(0);
        break;
      case "/cart":
      case "/checkout":
        setSelectedTab(1);
        break;
      case "/invoices":
        setSelectedTab(2);
        break;
      case "/signin":
      case "/signup":
        setSelectedTab(3);
        break;
      default:
        setSelectedTab(5);
    }
  }, [pathname]);

  const authHandler = () => {
    if (auth?.user) {
      dispatch(authActions.logout());
      setSelectedTab(0);
      navigate("/");
      return;
    }
    setSelectedTab(3);
    navigate("/signin");
  };
  return (
    <footer className={classes.footer}>
      <p className={classes.footerText}>Musicart | All rights reserved</p>
      <div className={classes.tabBar}>
        {/* home button */}
        <div
          className={classes.tabContainer}
          onClick={() => selectTabHandler(0)}
        >
          {selectedTab === 0 && <div className={classes.bar}></div>}
          <FaHome color={color} size={size} />
          <p className={classes.tabLabel}>Home</p>
        </div>

        {/* cart button */}
        <div
          className={classes.tabContainer}
          onClick={() => selectTabHandler(1)}
        >
          {selectedTab === 1 && <div className={classes.bar}></div>}
          <FaShoppingCart color={color} size={size} />
          <p className={classes.tabLabel}>Cart</p>
        </div>

        {/* invoices button */}
        <div
          className={classes.tabContainer}
          onClick={() => selectTabHandler(2)}
        >
          {selectedTab === 2 && <div className={classes.bar}></div>}
          <FaFileInvoice color={color} size={size} />
          <p className={classes.tabLabel}>Invoices</p>
        </div>

        {/* login button */}
        <div className={classes.tabContainer} onClick={authHandler}>
          {selectedTab === 3 && <div className={classes.bar}></div>}
          <BsPersonCircle color={color} size={size} />
          <p className={classes.tabLabel}>{auth?.user ? "Logout" : "Login"}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

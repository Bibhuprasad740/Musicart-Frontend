import React from "react";
import classes from "./MobileHeader.module.css";

import logo from "../assets/logo_only.png";
import { CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";

const MobileHeader = () => {
  const { pathname } = useLocation();
  const isProductPath = pathname.split("/")[1] === "products";
  const isProductPage = pathname === "/" || isProductPath;
  const isNotProductPage = pathname !== "/" && !isProductPage;

  return (
    <header className={classes.mobileHeader}>
      {/* search bar */}
      {isProductPage && (
        <div className={classes.searchBar}>
          <CiSearch size={25} color="black" />
          <input
            className={classes.searchInput}
            type="text"
            placeholder="Search by product name"
          />
        </div>
      )}
      {/* logo appbar */}
      {isNotProductPage && (
        <div className={classes.logoSection}>
          <img className={classes.image} src={logo} alt="logo.png" />
          <p className={classes.title}>Musicart</p>
        </div>
      )}
    </header>
  );
};

export default MobileHeader;

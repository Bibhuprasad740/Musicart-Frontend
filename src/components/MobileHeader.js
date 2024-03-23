import React from "react";
import classes from "./MobileHeader.module.css";

import logo from "../assets/logo_only.png";

const MobileHeader = () => {
  return (
    <header className={classes.mobileHeader}>
      <img className={classes.image} src={logo} alt="logo.png" />
      <p className={classes.title}>Musicart</p>
    </header>
  );
};

export default MobileHeader;

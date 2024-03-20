import React from "react";
import classes from "./Header.module.css";

import logo from "../assets/logo_only.png";

const Header = () => {
  return (
    <header className={classes.header}>
      <img className={classes.image} src={logo} alt="logo.png" />
      <p className={classes.title}>Musicart</p>
    </header>
  );
};

export default Header;

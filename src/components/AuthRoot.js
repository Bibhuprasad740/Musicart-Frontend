import React from "react";
import MobileHeader from "./MobileHeader";
import { Outlet } from "react-router-dom";
import classes from "./AuthRoot.module.css";

const AuthRoot = () => {
  return (
    <div className={classes.authRoot}>
      <MobileHeader />
      <div className={classes.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthRoot;

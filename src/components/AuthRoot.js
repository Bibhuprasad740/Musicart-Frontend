import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import classes from "./AuthRoot.module.css";

const AuthRoot = () => {
  return (
    <div className={classes.authRoot}>
      <Header />
      <div className={classes.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthRoot;

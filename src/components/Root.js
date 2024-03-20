import React from "react";
import classes from "./Root.module.css";

import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Root = () => {
  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;

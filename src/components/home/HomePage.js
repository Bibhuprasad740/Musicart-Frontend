import React from "react";
import classes from "./HomePage.module.css";
import MobileHeader from "../MobileHeader";
import DesktopHeader from "../DesktopHeader";

const HomePage = () => {
  return (
    <div className={classes.home}>
      <section className={classes.headerSection}>
        <div className={classes.mobile}>
          <MobileHeader />
        </div>
        <div className={classes.desktop}>
          <DesktopHeader />
        </div>
      </section>
    </div>
  );
};

export default HomePage;

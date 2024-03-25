import React from "react";
import classes from "./InvoicesPage.module.css";
import DesktopHeader from "../DesktopHeader";
import NavigationSection from "../NavigationSection";

const InvoicesPage = () => {
  return (
    <div className={classes.invoicesPage}>
      <DesktopHeader />
      <NavigationSection />
    </div>
  );
};

export default InvoicesPage;

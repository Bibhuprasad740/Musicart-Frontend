import React from "react";
import classes from "./RedirectButton.module.css";

const RedirectButton = ({ title }) => {
  return <button className={classes.redirectButton}>{title}</button>;
};

export default RedirectButton;

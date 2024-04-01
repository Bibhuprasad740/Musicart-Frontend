import React from "react";
import classes from "./ErrorPage.module.css";

import errorImge from "../../assets/404.jpg";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate("/");
  };
  return (
    <div className={classes.errorPage}>
      <img className={classes.image} src={errorImge} alt="" />
      <p className={classes.errorText}>
        The page you are looking for does not exist!
      </p>
      <button className={classes.backButton} onClick={backClickHandler}>
        Go back to home
      </button>
    </div>
  );
};

export default ErrorPage;

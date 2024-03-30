import React from "react";
import classes from "./BackButton.module.css";
import { useNavigate } from "react-router-dom";

import { IoMdArrowBack } from "react-icons/io";

const BackButton = ({ backTo, redirectTo }) => {
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate(redirectTo);
  };
  return (
    <div className={classes.backContainer} onClick={backClickHandler}>
      <div className={classes.desktopBack}>
        <p>{`Back to ${backTo}`}</p>
      </div>
      <div className={classes.mobileBack}>
        <div className={classes.backButton}>
          <IoMdArrowBack size={25} />
        </div>
      </div>
    </div>
  );
};

export default BackButton;

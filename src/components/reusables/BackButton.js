import React from "react";
import classes from "./BackButton.module.css";
import { NavLink } from "react-router-dom";

import { IoMdArrowBack } from "react-icons/io";

const BackButton = ({ backTo, redirectTo }) => {
  return (
    <NavLink to={redirectTo}>
      <div className={classes.desktopBack}>
        <p className={classes.backContainer}>{`Back to ${backTo}`}</p>
      </div>
      <div className={classes.mobileBack}>
        <div className={classes.backButton}>
          <IoMdArrowBack size={25} />
        </div>
      </div>
    </NavLink>
  );
};

export default BackButton;

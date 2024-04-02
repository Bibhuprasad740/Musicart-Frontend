import React from "react";
import classes from "./Modal.module.css";

const Modal = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.overlay}></div>
      <div className={classes.modalContent}>{children}</div>
    </div>
  );
};

export default Modal;

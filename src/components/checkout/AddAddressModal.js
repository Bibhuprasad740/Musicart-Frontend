import React from "react";
import classes from "./AddAddressModal.module.css";

const AddAddressModal = ({ onClose }) => {
  return (
    <div className={classes.addAddressModal}>
      <div className={classes.overlay}></div>
      <div className={classes.modalContent}>
        <p>hello world</p>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddAddressModal;

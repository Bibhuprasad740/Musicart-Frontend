import React from "react";
import classes from "./SubmitButton.module.css";

const SubmitButton = ({ onSubmit }) => {
  return (
    <button type="submit" onClick={onSubmit} className={classes.submitButton}>
      Continue
    </button>
  );
};

export default SubmitButton;

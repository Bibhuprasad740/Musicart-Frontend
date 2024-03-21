import React from "react";
import classes from "./SubmitButton.module.css";
import { useSelector } from "react-redux";

const SubmitButton = ({ onSubmit }) => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  return (
    <button
      type="submit"
      onClick={onSubmit}
      className={classes.submitButton}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Continue"}
    </button>
  );
};

export default SubmitButton;

import React, { useState } from "react";
import classes from "./FeedbackForm.module.css";
import useInput from "../hooks/use-input";
import axios from "axios";
import { useSelector } from "react-redux";
import { submitFeedbackApi } from "../../backend_apis";

const validateType = (type) => {
  return type === "bug" || type === "feedback" || type === "query";
};
const validateFeedback = (feedback) => {
  return feedback.trim().length !== 0;
};

const FeedbackForm = ({ onClose }) => {
  const token = useSelector((state) => state.auth.token);

  const [isLoading, setIsLoading] = useState(false);

  const {
    value: typeInputValue,
    isValid: isTypeValid,
    hasError: typeHasError,
    valueChangeHandler: typeInputChangeHandler,
    inputBlueHandler: typeInputBlurHandler,
    reset: resetType,
  } = useInput(validateType);

  const {
    value: feedbackInputValue,
    isValid: isFeedbackValid,
    hasError: feedbackHasError,
    valueChangeHandler: feedbackInputChangeHandler,
    inputBlueHandler: feedbackInputBlurHandler,
    reset: resetFeedback,
  } = useInput(validateFeedback);

  let formIsValid = false;

  if (isTypeValid && isFeedbackValid) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    setIsLoading(true);

    // save feedback in database
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = {
      type: typeInputValue,
      feedback: feedbackInputValue,
    };
    const response = await axios.post(submitFeedbackApi, body, { headers });
    console.log(response.data);
    resetType();
    resetFeedback();
    onClose();

    setIsLoading(false);
  };
  return (
    <div className={classes.formContainer}>
      <form onSubmit={submitHandler} className={classes.form}>
        <p className={classes.heading}>Type of feedback</p>
        <select
          className={typeHasError ? classes.error : ""}
          name="type"
          onChange={typeInputChangeHandler}
          onBlur={typeInputBlurHandler}
          value={typeInputValue}
        >
          <option value="">Select</option>
          <option value="bug">Bugs</option>
          <option value="feedback">Feedback</option>
          <option value="query">Query</option>
        </select>
        {typeHasError && <p className={classes.errorText}>*Required Field</p>}
        <p className={classes.heading}>Feedback</p>
        <textarea
          rows={10}
          className={feedbackHasError ? classes.error : ""}
          name="message"
          placeholder="Type your feedback"
          onChange={feedbackInputChangeHandler}
          onBlur={feedbackInputBlurHandler}
          value={feedbackInputValue}
        />
        {feedbackHasError && (
          <p className={classes.errorText}>*Required Field</p>
        )}
        <button disabled={!formIsValid} type="submit">
          {isLoading ? "Please wait" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;

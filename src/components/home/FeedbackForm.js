import React from "react";
import classes from "./FeedbackForm.module.css";
import useInput from "../hooks/use-input";

const validateType = (type) => {
  return type === "bug" || type === "feedback" || type === "query";
};
const validateFeedback = (feedback) => {
  return feedback.trim().length !== 0;
};

const FeedbackForm = ({ onClose }) => {
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

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    // do something with it
    console.log(typeInputValue, feedbackInputValue);

    resetType();
    resetFeedback();
    onClose();
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;

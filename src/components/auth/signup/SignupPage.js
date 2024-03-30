import React, { useEffect } from "react";
import classes from "./SignupPage.module.css";

import logo from "../../../assets/logo.png";
import SubmitButton from "../../reusables/SubmitButton";
import { NavLink } from "react-router-dom";
import useInput from "../../hooks/use-input";
import { useDispatch, useSelector } from "react-redux";
import { authActions, signup } from "../../../store/authSlice";
import MobileHeader from "../../MobileHeader";
import DesktopHeader from "../../DesktopHeader";
import { toast } from "react-hot-toast";

const validateName = (name) => {
  return name.trim().length > 0;
};
const validatePhone = (phoneno) => {
  return phoneno.trim().length === 10;
};
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const validatePassword = (password) => {
  return password.trim().length > 0;
};

const SignupPage = () => {
  const dispatch = useDispatch();

  const authError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (authError) {
      toast.error(authError);
      dispatch(authActions.setError(null));
    }
  }, [authError, dispatch]);

  // name input state
  const {
    value: nameInputValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlueHandler: nameInputBlurHandler,
  } = useInput(validateName);

  // phone number input state
  const {
    value: phoneInputValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneInputChangeHandler,
    inputBlueHandler: phoneInputBlurHandler,
  } = useInput(validatePhone);

  // email input state
  const {
    value: emailInputValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlueHandler: emailInputBlurHandler,
  } = useInput(validateEmail);

  // password input state
  const {
    value: passwordInputValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordInputChangeHandler,
    inputBlueHandler: passwordInputBlurHandler,
  } = useInput(validatePassword);

  let formIsValid = false;

  if (nameIsValid && phoneIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    // do something with the data
    dispatch(
      signup(
        nameInputValue,
        phoneInputValue,
        emailInputValue,
        passwordInputValue
      )
    );
  };
  return (
    <div className={classes.signupPage}>
      <section className={classes.headerSection}>
        <div className={classes.mobile}>
          <MobileHeader />
        </div>
        <div className={classes.desktop}>
          <DesktopHeader />
        </div>
      </section>
      {/* <Footer /> */}
      <div className={classes.container}>
        {/* logo */}
        <div className={classes.imageContainer}>
          <img className={classes.image} src={logo} alt="logo.png" />
        </div>
        {/* form section */}
        <form className={classes.formSection} onSubmit={submitHandler}>
          <p className={classes.formHeading}>Create Account</p>
          {/* name input */}
          <div className={classes.inputArea}>
            <label htmlFor="name" className={classes.inputTitle}>
              Your Name
            </label>
            <div
              className={
                nameHasError
                  ? `${classes.inputBox} ${classes.invalid}`
                  : `${classes.inputBox}`
              }
            >
              <input
                className={classes.userInput}
                type="text"
                id="name"
                value={nameInputValue}
                onChange={nameInputChangeHandler}
                onBlur={nameInputBlurHandler}
              />
            </div>
            {nameHasError && <p className={classes.error}>*Invalid name</p>}
          </div>

          {/* mobile number input */}
          <div className={classes.inputArea}>
            <label htmlFor="phone" className={classes.inputTitle}>
              Mobile Number
            </label>
            <div
              className={
                phoneHasError
                  ? `${classes.inputBox} ${classes.invalid}`
                  : `${classes.inputBox}`
              }
            >
              <input
                className={classes.userInput}
                type="tel"
                name="phone"
                value={phoneInputValue}
                onChange={phoneInputChangeHandler}
                onBlur={phoneInputBlurHandler}
              />
            </div>
            {phoneHasError && <p className={classes.error}>*Invalid email</p>}
          </div>

          {/* Email input */}
          <div className={classes.inputArea}>
            <label htmlFor="email" className={classes.inputTitle}>
              Enter Email
            </label>
            <div
              className={
                emailHasError
                  ? `${classes.inputBox} ${classes.invalid}`
                  : `${classes.inputBox}`
              }
            >
              <input
                className={classes.userInput}
                type="email"
                id="email"
                value={emailInputValue}
                onChange={emailInputChangeHandler}
                onBlur={emailInputBlurHandler}
              />
            </div>
            {emailHasError && <p className={classes.error}>*Invalid email</p>}
          </div>

          {/* password input */}
          <div className={classes.inputArea}>
            <label htmlFor="password" className={classes.inputTitle}>
              Enter password
            </label>
            <div
              className={
                passwordHasError
                  ? `${classes.inputBox} ${classes.invalid}`
                  : `${classes.inputBox}`
              }
            >
              <input
                className={classes.userInput}
                type="password"
                id="password"
                value={passwordInputValue}
                onChange={passwordInputChangeHandler}
                onBlur={passwordInputBlurHandler}
              />
            </div>
            {passwordHasError && (
              <p className={classes.error}>*Invalid password</p>
            )}
          </div>

          <p className={classes.readme}>
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Musicart.
            Message and data rates may apply.
          </p>

          {/* submit button */}
          <SubmitButton onSubmit={submitHandler} />
        </form>
        <div className={classes.redirectionSection}>
          <p className={classes.redirectText}>Already have account? </p>
          <NavLink to="/signin">
            <p className={classes.redirectButton}>Login</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

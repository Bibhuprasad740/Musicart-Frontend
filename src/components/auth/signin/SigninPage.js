import React from "react";
import classes from "./SigninPage.module.css";

import logo from "../../../assets/logo.png";
import SubmitButton from "../../reusables/SubmitButton";
import RedirectButton from "../../reusables/RedirectButton";
import { NavLink } from "react-router-dom";
import useInput from "../../hooks/use-input";
import { signin } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import MobileHeader from "../../MobileHeader";
import DesktopHeader from "../../DesktopHeader";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const validatePassword = (password) => {
  return password.trim().length > 0;
};

const SigninPage = () => {
  const dispatch = useDispatch();

  // email input state
  const {
    value: emailInputValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlueHandler: emailInputBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  // password input state
  const {
    value: passwordInputValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordInputChangeHandler,
    inputBlueHandler: passwordInputBlurHandler,
    reset: resetPassword,
  } = useInput(validatePassword);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    // do something with the data
    dispatch(signin(emailInputValue, passwordInputValue));

    // reset the input
    resetEmail();
    resetPassword();
  };
  return (
    <div className={classes.signinPage}>
      {/* Header */}
      <section className={classes.headerSection}>
        <div className={classes.mobile}>
          <MobileHeader />
        </div>
        <div className={classes.desktop}>
          <DesktopHeader />
        </div>
      </section>

      <div className={classes.container}>
        {/* logo */}
        <div className={classes.imageContainer}>
          <img className={classes.image} src={logo} alt="logo.png" />
        </div>
        {/* form section */}
        <form className={classes.formSection} onSubmit={submitHandler}>
          <p className={classes.formHeading}>Sign in</p>
          {/* email input */}
          <div className={classes.inputArea}>
            <label htmlFor="email" className={classes.inputTitle}>
              Enter your email
            </label>
            <div
              className={
                emailHasError
                  ? `${classes.inputBox} ${classes.invalid}`
                  : `${classes.inputBox}`
              }
            >
              <input
                id="email"
                className={classes.userInput}
                type="email"
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
              Enter your password
            </label>
            <div
              className={
                passwordHasError
                  ? `${classes.inputBox} ${classes.invalid}`
                  : `${classes.inputBox}`
              }
            >
              <input
                id="password"
                className={classes.userInput}
                type="password"
                value={passwordInputValue}
                onChange={passwordInputChangeHandler}
                onBlur={passwordInputBlurHandler}
              />
            </div>
            {passwordHasError && (
              <p className={classes.error}>*Invalid password</p>
            )}
          </div>

          {/* submit button */}
          <SubmitButton onSubmit={submitHandler} />
        </form>

        {/* divider */}
        <div className={classes.dividerSection}>
          <div className={classes.divider}></div>
          <div>
            <p className={classes.dividerText}>New to Musicart ?</p>
          </div>
          <div className={classes.divider}></div>
        </div>

        {/* redirect button */}
        <NavLink to="/signup">
          <RedirectButton title="Create Your Musicart Account" />
        </NavLink>
      </div>
    </div>
  );
};

export default SigninPage;

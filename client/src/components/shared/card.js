import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const LoginCard = ({
  title,
  email,
  password,
  onchange,
  handleClick,
  name,
  signup,
  error,
  isSubmitting,
}) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //Check email is valid or not
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  //check password is valid or not
  const isPasswordValid = (password) => {
    return /^.{6,}$/.test(password);
  };


  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError(null);
    }
    onchange(event.target.value, "email");
  };

  const handlePasswordChange = (event) => {
    if (signup && !isPasswordValid(event.target.value)) {
      setPasswordError("Minimum 6 character");
    } else {
      setPasswordError(null);
    }
    onchange(event.target.value, "password");
  };

  return (
    <div className="login__container">
      <div className="login__card">
        <h2>{title}</h2>
        {signup && (
          <div className="inputs__box">
            <input
              className="inputs"
              type="text"
              placeholder="name"
              value={name}
              onChange={(event) => onchange(event.target.value, "name")}
            />
          </div>
        )}
        <div className="inputs__box">
          <input
            className="inputs"
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          {emailError && <p className="custom__error">{emailError}</p>}
        </div>
        <div className="inputs__box">
          <input
            className="inputs"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="custom__error">{passwordError}</p>}
        </div>
        {signup && (
          <div className="inputs__box">
            <input
              className="inputs"
              type="password"
              placeholder="Confirm Password"
              onChange={(event) => {
                if (event.target.value !== password) {
                  setPasswordError("Password did not match");
                } else {
                  setPasswordError("");
                }
              }}
            />
          </div>
        )}
        {isSubmitting ? (
          <button type="button" disabled>
            {title}...
          </button>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            disabled={emailError || passwordError}
          >
            SUBMIT
          </button>
        )}
        {error && <p className="error_message">{error}</p>}
        <p className="navigate__link">
          Don't have an account?{" "}
          {title === "Login to Open Chat" ? (
            <Link to="/register">Register</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginCard;

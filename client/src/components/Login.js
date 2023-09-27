import React, { useState } from "react";
import LoginCard from "./shared/card";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  const handleLogin = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      if (!email || !password) {
        setError("Email and password are required.");
        return;
      }

      if (!isValidEmail(email)) {
        setError("Invalid email address.");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      if (response.status === 201) {
        const user = response?.data;
        localStorage.setItem("token", user?.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while logging in.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const onChange = (value, field) => {
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };
  return (
    <LoginCard
      title="Login to Open Chat"
      email={email}
      password={password}
      handleClick={handleLogin}
      onchange={onChange}
      error={error}
      isSubmitting={isSubmitting}
    />
  );
};

export default Login;

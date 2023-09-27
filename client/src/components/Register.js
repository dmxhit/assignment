import React, { useState } from "react";
import LoginCard from "./shared/card";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const response = await api.post("/auth/register", {
        email: email,
        password: password,
        name: name,
      });

      if (response.status === 201) {
        const user = response?.data;
        localStorage.setItem("token", user?.token);
        navigate("/");
      } else {
        // Handle other success cases if needed
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while registering.");
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
    } else if (field === "name") {
      setName(value);
    }
  };
  return (
    // title, email, password, onchange, handleClick
    <LoginCard
      title="Register to Open Chat"
      email={email}
      password={password}
      handleClick={handleRegister}
      name={name}
      signup={true}
      onchange={onChange}
      error={error}
      isSubmitting={isSubmitting}
    />
  );
};

export default Register;

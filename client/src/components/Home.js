import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";
import "./style.css";
const Home = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetail();
  }, []);
  const getUserDetail = async () => {
    const response = await api.get("/auth/getuser");
    if (response) {
      setUser(response?.data?.data);
    }
  };

  const startChat = () => {
    navigate("/chat");
  };
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="home__container">
      <h1>Hi {user?.name}!</h1>

      <button onClick={startChat} className="home__btn">
        Start chat
      </button>
      <button onClick={logout} className="home__btn__logout">
        Logout
      </button>
    </div>
  );
};

export default Home;

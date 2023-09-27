import React, { useState, useEffect } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import api from "../../api";
import "./style.css";
import { useNavigate } from "react-router-dom";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    getUserDetail();
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  const getUserDetail = async () => {try {
    const response = await api.get("/auth/getuser");
    if (response) {
      setUser(response?.data?.data);
    }
  } catch (error) {
    navigate("/login");
  }
 
  };
  
  return (
    <div className="chat">
      <div className="chat__main">
        <ChatBody messages={messages} name={user?.name} />
        <ChatFooter socket={socket} name={user?.name} />
      </div>
    </div>
  );
};

export default ChatPage;

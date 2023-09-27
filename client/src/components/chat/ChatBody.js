import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import backBtn from "../../assets/back.png";

const ChatBody = ({ messages, name }) => {
  const navigate = useNavigate();

  //Method to leave chat
  const handleLeaveChat = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <img
          src={backBtn}
          alt="back-arrow"
          className="leaveChat__btn"
          onClick={handleLeaveChat}
        />
        <p>My Chat Box</p>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === name ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">ME</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ChatBody;

import React, { useState } from "react";
import "./style.css";
import sendBtn from "../../assets/send.png";

const ChatFooter = ({ socket, name }) => {
  const [message, setMessage] = useState("");

  // Trigger event when use click on send message button
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", {
        text: message,
        name: name,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send__btn">
          <img src={sendBtn} alt="send" className="send__btn_icon" />
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;

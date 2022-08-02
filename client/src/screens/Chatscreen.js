import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { URLDEV } from "../utils/const.js";
import "../styles/chatscreens.css";

const socket = io(URLDEV);

const Chatscreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handlesubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([...messages, message]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  return (
    <div className="container-chat">
      <h1>Chat</h1>
      <div className="container-body-chat">
        {messages.map((mes, index) => (
          <div className="body-chat" key={index}>
            <p>
              {mes.from} : {mes.body}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handlesubmit} className="form">
        <input
          type="text"
          className="input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

     
      </form>
    </div>
  );
};

export default Chatscreen;

import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { URLDEV } from "./utils/const.js";

// se le pasa la direccion del servidor websocket,
//socket es el puente de comunicacion entre en backend y el frontend
const socket = io(URLDEV);

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handlesubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  return (
    <div className="App">
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>send</button>
      </form>

      {messages.map((mes, index) => (
        <div key={index}>
          <p>
            {mes.from} : {mes.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;

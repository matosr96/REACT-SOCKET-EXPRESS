import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { URLDEV } from "./utils/const.js";

// se le pasa la direccion del servidor websocket,
//socket es el puente de comunicacion entre en backend y el frontend
const socket = io(URLDEV);

function App() {
  const [message, setMessage] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      console.log(message);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

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
    </div>
  );
}

export default App;

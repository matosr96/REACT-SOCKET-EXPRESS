import "./App.css";
import io from "socket.io-client";
import { URLDEV } from "./utils/const.js";

// se le pasa la direccion del servidor websocket
const socket = io(URLDEV);

function App() {
  return (
    <div className="App">
      <h1>APP</h1>
    </div>
  );
}

export default App;

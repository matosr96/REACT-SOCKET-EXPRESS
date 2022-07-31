import express from "express";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { PORT } from "./config.js";

//creamos un servidor express y lo guardamos en la constante "app"
const app = express();

//como express no es enteramente compatible con socket.io, debemos importar el modulo http de node
//y pasarle como parametro el servidor de express anteriormente creado, en este caso "app", luego guardamos en una constante
// la cual en este ejercicio se llama "server", server vendria siendo un servidor http compatible con socket.io
// y ese es el que debemos pasarle en la instancia creada de socket.io "new Server(server)""
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//el modulo de morgan, muestra en consola cuando se realiza una peticion,
//por ejemplo un GET, y dice cuanto tardo en responser el servidor
app.use(morgan("dev"));

//cuando ocurra una nueva conexion quiero que hagas algo
io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("a user connected");
});
app.use(cors());

server.listen(PORT);
console.log("SERVER IS RUNNING ON PORT", PORT);

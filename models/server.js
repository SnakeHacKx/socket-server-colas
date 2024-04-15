import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketController } from "../sockets/controller.js";

class SocketServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.server = createServer(this.app);
    this.io = new Server(this.server); // Socket.io: Servidor de sockets

    this.paths = {};

    // Middlewares
    this.middlewares();

    //Rutas de la aplicación
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  /**
   * Rutas del servidor
   */
  routes() {
    // this.app.use(this.paths.users, router_users);
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

export default SocketServer;

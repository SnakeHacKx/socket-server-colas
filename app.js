import dotenv from "dotenv";
import SocketServer from "./models/server.js";

dotenv.config();

const server = new SocketServer();

server.listen();
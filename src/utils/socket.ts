import { io } from "socket.io-client";

const socket = io("ws://192.168.15.32:3000/");
export default socket;
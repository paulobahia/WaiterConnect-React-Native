import { io } from "socket.io-client";

const socket = io("ws://SEUIP:7070/");
export default socket;
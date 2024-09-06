import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 1000,
    transports: ["websocket"],
  };
  return io("http://localhost:3000/", options);
};

import { io } from "socket.io-client";

// this function initialise and configures socket.io-client connection to server
export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  //   returns socket.io-client socket instanse as promise
  return io(process.env.REACT_APP_BACKEND_URL, options);
};

const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require("http");

const server = http.createServer(app);

// connecting server to socket-server
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("---socket connected---", socket.id);
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

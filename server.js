const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const ACTIONS = require("./src/Actions");

const server = http.createServer(app);

// connecting server to socket-server
const io = new Server(server);

// user-socket mapping, to store which user have which socketId
const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  const connectedClients = Array.from(
    // getting clients/sockets list connected in a room
    io.sockets.adapter.rooms.get(roomId) || []
  );
  return connectedClients.map((socketId) => {
    return { socketId, username: userSocketMap[socketId] };
  });
};
io.on("connection", (socket) => {
  // each client have unique socketId
  console.log("---socket connected---", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clientList = getAllConnectedClients(roomId);
    console.log("---server connected clients---", clientList);
    clientList.forEach(({ socketId }) => {
      // emit event to all connected clients array
      io.to(socketId).emit(ACTIONS.JOINED, {
        clientList,
        username,
        socketId: socket.id, // current connected socket/client
      });
    });
  });

  // when client/socket disconnected(close window)
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    // console.log("---roooms----", rooms);

    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    // delete user
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

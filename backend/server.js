const express = require("express");
const app = express();

const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { addUser } = require("./utils/users");
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("this is backend");
});

let roomIdGlobal, imageURLGlobal;

io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    const users = addUser(name, socket.id, roomId, host, presenter);

    socket.emit("userIsJoined", { success: true, users });
    socket.broadcast.to(roomId).emit("allUsers", users);
    socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
      imageUrl: imageURLGlobal,
    });
  });
  socket.on("whiteboardData", (data) => {
    imageURLGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {
      imageUrl: data,
    });
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log("Server is running on", port));

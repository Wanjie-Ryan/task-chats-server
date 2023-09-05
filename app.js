const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //   console.log(socket);
  //   console.log(`User with id:${socket.id} connected`);

  socket.on("join_room", (room) => {
    // console.log(room)
    // console.log(`user with id:${socket.id} joined room:${room}`)
    socket.join(room);
  });

  socket.on("send_message", (data, { roomId }) => {
    // console.log(`message received in room ${roomId}:`, data)

    // socket.emit("receive_message", data);
    socket.to(roomId).emit("receive_message", data);
    // console.log(data)
  });

  socket.on("disconnect", () => {
    console.log(`User with id:${socket.id} disconnected`);
    // const rooms = Object.keys(socket.room);
    // rooms.forEach((room) => {
    //   socket.leave(room);
    // });
  });
});

app.get("/wake-up", (req, res) => {
  res.json({
    responseType: "success",
    message: "Server is awake",
  });
});

server.listen(3009, () => {
  console.log("server is up");
});

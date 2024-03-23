const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

let chats = [];
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  // socket.on("join_room", (roomId) => {
  //   socket.join(roomId);
  //   console.log(`user with id-${socket.id} joined room - ${roomId}`);
  // });
  socket.on("send_msg", (data) => {
    console.log(data, "DATA SEND MESSAGE");
    // push data with ascending order
    chats.push(data);
    // send data to all users
    // io.broadcast.emit("receive_msg", data);
    // send data only once because I'm getting 3 messages at frontend
    io.emit("receive_msg", chats);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

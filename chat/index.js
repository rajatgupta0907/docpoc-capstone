const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("send:message", ({ senderId, receiverId, message }) => {
    console.log(
      `Message received from sender ${senderId} to receiver ${receiverId}: ${message}`
    );

    // Check if both senderId and receiverId are valid
    if (senderId && receiverId) {
      // Emit the message to the receiver
      socket.broadcast.emit(`receive:message:${receiverId}`, {
        senderId,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

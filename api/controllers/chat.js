const http = require("http");
const socketIO = require("socket.io");

export const chatController = (app) => {
  const server = http.createServer(app);
  const io = socketIO(server);

  io.on("connection", function (socket) {
    socket.on("newuser", function (username) {
      socket.broadcast.emit("update", username + " joined the conversation");
    });
    socket.on("exituser", function (username) {
      socket.broadcast.emit("update", username + " left the conversation");
    });
    socket.on("chat", function (message) {
      socket.broadcast.emit("chat", message);
    });
  });

  return server;
};

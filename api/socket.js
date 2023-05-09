const setupSocket = (io) => {

  // Event handler for client connection
  io.on("connection", (socket) => {
    console.log("User connected");

    // Event handler for when a new user joins the conversation
    socket.on("newuser", (username) => {
      console.log(`${username} joined the conversation`);
      socket.broadcast.emit("update", username + " joined the conversation");
    });

    // Event handler for when a user exits the conversation
    socket.on("exituser", (username) => {
      console.log(`${username} left the conversation`);
      socket.broadcast.emit("update", username + " left the conversation");
    });

    // Event handler for chat messages
    socket.on("chat", (message) => {
      console.log("Received chat message:", message);
      socket.broadcast.emit("chat", message);
    });

    // Event handler for client disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default setupSocket;

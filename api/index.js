import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import searchRoutes from "./routes/searchs.js";
import relationshipRoutes from "./routes/relationships.js";
import likeRoutes from "./routes/likes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

const app = express();
const server = createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
}); // Create a WebSocket server

// Socket.io events
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("newuser", (username) => {
    console.log(`${username} joined the conversation`);
    socket.broadcast.emit("update", username + " joined the conversation");
  });

  socket.on("exituser", (username) => {
    console.log(`${username} left the conversation`);
    socket.broadcast.emit("update", username + " left the conversation");
  });

  socket.on("chat", (message) => {
    console.log("Received chat message:", message);
    socket.broadcast.emit("chat", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Middleware routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use('/api/searchs', searchRoutes);

// Catch-all route for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Change app.listen to server.listen
server.listen(8800, () => {
  console.log("Server is running on port 8800");
});

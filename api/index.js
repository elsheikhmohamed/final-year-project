// Importing required modules and files
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
import setupSocket from "./socket.js";

// Initializing Express app, server, and socket.io
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

setupSocket(io);

// Middleware to set cache control and parse JSON
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});
app.use(express.json());

// Enable CORS and cookie parsing
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

// Set up multer for file uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Handle file upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Set up routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/searchs", searchRoutes);

// Catch-all route for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Start the server
server.listen(8800, () => {
  console.log("Server is running on port 8800");
});
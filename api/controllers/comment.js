// Import required modules
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Get comments for a specific post
export const getComments = (req, res) => {

  const query = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
      WHERE c.postId = ? ORDER BY c.createdDate DESC`;

  // Execute the query and return the comments
  db.query(query, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Add a new comment to a post
export const addComment = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Query to insert a new comment
    const query =
      'INSERT INTO comments(`desc`, `createdDate`, `userId`, `postId`) VALUES (?)';
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];

    // Execute the query and return a success message
    db.query(query, [values], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment added successfully");
    });
  });
};

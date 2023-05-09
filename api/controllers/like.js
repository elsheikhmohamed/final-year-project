import { db } from "../connect.js";
import jwt from "jsonwebtoken";


export const getLikes = (req, res) => {
  const query = "SELECT userId FROM likes WHERE postId = ?";

  // Execute the query and return an array of userIds who liked the post
  db.query(query, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map(like => like.userId));
  });
};

// Add a like to a post
export const addLike = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Query to insert a new like
    const query = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
    const values = [userInfo.id, req.body.postId];

    // Execute the query and return a success message
    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked.");
    });
  });
};

// Remove a like from a post
export const deleteLike = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Query to delete a like
    const query = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

    // Execute the query and return a success message
    db.query(query, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been unliked.");
    });
  });
};

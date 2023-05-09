import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Get user information by their ID
export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT id, name, email, username, profilePic, university FROM users WHERE id=?";

  // Execute the database query
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    // Return the user information as a JSON object
    return res.json(data[0]);
  });
};

// Update user information
export const updateUser = (req, res) => {
  // Check if the user is authenticated
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  // Verify the JWT token
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // SQL query to update the user's information
    const q =
      "UPDATE users SET name=?, profilePic=?, university=? WHERE id=?";

    // Execute the database query with the updated values
    db.query(
      q,
      [
        req.body.name,
        req.body.profilePic,
        req.body.university,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        // Check if any rows were affected by the query
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your own user information!");
      }
    );
  });
};

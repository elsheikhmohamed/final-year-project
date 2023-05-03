import { db } from "../connect.js";

export const searchUsers = (req, res) => {
  console.log("Search request received:", req.query.query);
  
  const q = "SELECT id, username FROM users WHERE username LIKE ?";
  const searchQuery = `%${req.query.query}%`;
  
  db.query(q, [searchQuery], (err, data) => {
    if (err) {
      console.error("Error in database query:", err);
      return res.status(500).json(err);
    }
    console.log("Search results:", data);
    return res.status(200).json(data);
  });
};
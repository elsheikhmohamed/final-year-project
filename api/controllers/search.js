import { db } from "../connect.js";

// Search for users by their username
export const searchUsers = (req, res) => {
  console.log("Search request received:", req.query.query);
  
  // SQL query to search for users whose username contains the search query
  const q = "SELECT id, username FROM users WHERE username LIKE ?";
  const searchQuery = `%${req.query.query}%`;
  
  // Execute the database query
  db.query(q, [searchQuery], (err, data) => {
    if (err) {
      console.error("Error in database query:", err);
      return res.status(500).json(err);
    }
    console.log("Search results:", data);
    return res.status(200).json(data);
  });
};

import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT id, name, email,username, profilePic, university FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data[0]);
  });
};



export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET name=?, profilePic=?, university=? WHERE id=?";

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
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your own user information!");
      }
    );
  });
};

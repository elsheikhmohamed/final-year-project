import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const register = (req, res) => {
  // Check if the user already exists
  const userExistQuery = "SELECT * FROM users WHERE username = ?";

  db.query(userExistQuery, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");


    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const insertUserQuery =
      "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    // Insert the new user into the database
    db.query(insertUserQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("User created successfully");
    });
  });
};

// Login a user
export const login = (req, res) => {
  const loginUserQuery = "SELECT * FROM users WHERE username = ?";

  db.query(loginUserQuery, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json("User not found!");

    // Check if the password is correct
    const validPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!validPassword) return res.status(401).json("Invalid password");

    // Create and assign a token
    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

// Logout a user
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};

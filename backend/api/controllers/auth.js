import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //check if the user already exists

  const userExist = "SELECT * FROM users WHERE username = ?";

  db.query(userExist, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // create a new user
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const userExist =
      "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?, ?, ?, ?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(userExist, values, (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("User created successfully");
    });
  });
};

export const login = (req, res) => {

    const login = "SELECT * FROM users WHERE username = ?";

    db.query(login, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (!data.length) return res.status(404).json("User not found!");

        // check if the password is correct
        const validPassword = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!validPassword) return res.status(401).json("Invalid password");

        // create and assign a token
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

export const logout = (req, res) => {
    res.clearCookie("accessToken",{
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been logged out.")
  };
  
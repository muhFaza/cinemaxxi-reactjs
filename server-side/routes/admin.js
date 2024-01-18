const express = require("express");
const app = express.Router();
const authentication = require("../middlewares/authentication");
const Helper = require("../helpers");
const { User, Genre } = require("../models");
const movieRoutes = require("./movies");
const genreRoutes = require("./genres");

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) throw { name: "Email is required" };
    if (!password) throw { name: "Password is required" };
    const data = await User.findOne({ where: { email } });
    if (!data) throw { name: "User not found" };
    const isPasswordValid = Helper.compare(password, data.password);
    if (!isPasswordValid) throw { name: "Invalid password" };
    const payload = {
      id: data.id,
      email: data.email,
      role: data.role,
    };
    const access_token = Helper.sign(payload);
    res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
});

// Authentication
app.use(authentication);

app.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, phoneNumber, address } = req.body;
    const role = "admin";
    const data = await User.create({
      username,
      email,
      password,
      phoneNumber,
      address,
      role,
    });
    res.status(201).json({ message: "Created new admin account successfully" });
  } catch (err) {
    next(err);
  }
});

app.use("/movies", movieRoutes);

app.use("/genres", genreRoutes);

module.exports = app;

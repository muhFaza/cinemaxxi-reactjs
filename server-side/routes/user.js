const express = require("express");
const app = express.Router();
const { User, Movie, Cast, Genre } = require("../models");


app.get("/movies", async (req, res, next) => {
  try {
    const movies = await Movie.findAll({
      include: [Cast, Genre],
    });
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
})


app.get("/genres", async (req, res, next) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
})

module.exports = app;
const express = require("express");
const app = express.Router();
const Helper = require("../../helpers");
const { User, Movie, Cast, Genre, sequelize } = require("../../models");

app.get("/", async (req, res, next) => {
  try {
    const { id } = req.query;
    let genres;
    if (!id) {
      genres = await Genre.findAll();
    } else {
      genres = await Genre.findByPk(id);
    }
    res.status(200).json(genres);
  } catch (err) {
    next(err);
  }
});

// POST GENRE
app.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const [genre, created] = await Genre.findOrCreate({
      where: { name },
      defaults: { name },
    });
    if (!created) throw { name: "Genre already exists" };
    res.status(201).json({ message: "Created new genre successfully" });
  } catch (err) {
    next(err);
  }
});

// PUT GENRE
app.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!id) throw { name: "Genre ID required" };
    if (!name) throw { name: "Genre name required" };
    const findGenre = await Genre.findByPk(id);
    if (!findGenre) throw { name: "Genre not found" };
    const findName = await Genre.findOne({ where: { name } });
    if (findName) throw { name: "Genre already exists" };
    const genre = await Genre.update({ name }, { where: { id } });
    res.status(201).json({ message: "Updated genre successfully" });
  } catch (err) {
    next(err);
  }
});

// DELETE GENRE
app.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw { name: "Genre ID required" };
    const findGenre = await Genre.findByPk(id);
    if (!findGenre) throw { name: "Genre not found" };
    const genre = await Genre.destroy({ where: { id } });
    res.status(200).json({ message: "Deleted genre successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = app;

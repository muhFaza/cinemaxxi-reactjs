const express = require("express");
const app = express.Router();
const Helper = require("../../helpers");
const { User, Movie, Cast, Genre, sequelize } = require("../../models");

app.get("/", async (req, res, next) => {
  try {
    const { id } = req.query;
    let movies;
    if (!id) {
      console.log("msk sini");
      movies = await Movie.findAll({ include: [Cast, Genre, User], order: [["id", "ASC"]] });
    } else {
      movies = await Movie.findByPk(id);
      if (!movies) throw { name: "Movie not found" };
    }
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
});

// POST MOVIE
app.post("/", async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let { title, synopsis, trailerUrl, imgUrl, rating, genreId, casts } =
      req.body;
    if (!title) throw { name: "Movie title is required" };
    const slug = Helper.slugify(title);
    const [mov, created] = await Movie.findOrCreate({
      where: { title },
      defaults: {
        title,
        slug,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        authorId: req.user.id,
        genreId,
      },
      transaction: t,
    });
    if (!created) throw { name: "Movie already exists" };
    // casts has to be an array with length of min 1 max 3
    if (!casts || casts.length < 1 || casts.length > 3) {
      throw { name: "There has to be at least 1 cast, max 3." };
    }

    casts = casts
      .filter((el) => el.name)
      .map(el => ({name: el.name, profilePict: el.profilePict, movieId: mov.id}));

    const cast = await Cast.bulkCreate(casts, { transaction: t });

    await t.commit();
    res.status(201).json({ message: "Created new movie successfully" });
  } catch (err) {
    await t.rollback();
    next(err);
  }
});

// PUT MOVIE
app.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw { name: "Movie ID required" };
    const findMovie = await Movie.findByPk(id);
    if (!findMovie) throw { name: "Movie not found" };
    const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;

    let slug;
    if (title) slug = Helper.slugify(title);

    const mov = await Movie.update(
      {
        title,
        slug,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
      },
      { where: { id } }
    );

    res.status(201).json({ message: "Updated movie successfully" });
  } catch (err) {
    next(err);
  }
});

// DELETE MOVIE
app.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw { name: "Movie ID required" };
    const findMovie = await Movie.findByPk(id);
    if (!findMovie) throw { name: "Movie not found" };
    const mov = await Movie.destroy({ where: { id } });
    res.status(200).json({ message: "Deleted movie successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = app;
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsTo(models.Genre, {foreignKey: "genreId"})
      Movie.belongsTo(models.User, {foreignKey: "authorId"})
      Movie.hasMany(models.Cast, {foreignKey: "movieId"})
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg : "Title is required"},
        notEmpty: {msg : "Title is required"}
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg : "Slug is required"},
        notEmpty: {msg : "Slug is required"}
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {msg : "Synopsis is required"},
        notEmpty: {msg : "Synopsis is required"}
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.DECIMAL(10, 1),
      allowNull: false,
      validate: {
        notNull: {msg : "Rating is required"},
        notEmpty: {msg : "Rating is required"},
        min: {
          args: [0],
          msg: "Rating has to be at least 0"
        },
        max: {
          args: [10],
          msg: "Rating has to be at most 10"
        }
      }
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg : "Genre is required"},
        notEmpty: {msg : "Genre is required"}
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg : "Author is required"},
        notEmpty: {msg : "Author is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cast.belongsTo(models.Movie, {foreignKey: "movieId"})
    }
  }
  Cast.init({
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg : "MovieId is required"},
        notEmpty: {msg : "MovieId is required"}
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg : "Name is required"},
        notEmpty: {msg : "Name is required"}
      }
    },
    profilePict: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};
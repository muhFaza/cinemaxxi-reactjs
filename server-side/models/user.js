'use strict';
const {
  Model
} = require('sequelize');
const Helper = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Movie, {foreignKey: "authorId"})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg : "Username is required"},
        notEmpty: {msg : "Username is required"}
      },
      unique: {
        args: true,
        msg: "Username already exists"
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg : "Email is required"},
        notEmpty: {msg : "Email is required"},
        isEmail: {msg : "Invalid email format"}
      },
      unique: {
        args: true,
        msg: "Email already exists"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg : "Password is required"},
        notEmpty: {msg : "Password is required"},
        len: {
          args: [5, 32],
          msg: "Password has to be 5 - 32 characters"
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = Helper.hash(user.password);
      }
    }
  });
  return User;
};
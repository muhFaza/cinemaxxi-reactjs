const app = require("../app");

const errorHandler = ((err, req, res, next) => {
  console.log(err);
  let status = 500;
  let message = "Internal Server Error";

  if (
    err.name == "JsonWebTokenError" ||
    err.name == "NoTokenFound" ||
    err.name == "UserNotFound"
  ) {
    status = 401;
    message = "Invalid token";
  } else if (err.name == "ID unauthorized") {
    status = 403;
    message = "Unauthorized";
  } else if (err.name == "SequelizeValidationError") {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name == "SequelizeUniqueConstraintError") {
    status = 400;
    message = err.message;
  } else if (
    err.name == "Email is required" ||
    err.name == "Password is required" ||
    err.name == "Movie ID required" ||
    err.name == "Genre ID required" || 
    err.name == 'There has to be at least 1 cast, max 3.' ||
    err.name == 'Movie title is required' ||
    err.name == 'Movie already exists' ||
    err.name == 'Genre already exists' ||
    err.name == 'Genre name required'
  ) {
    status = 400;
    message = err.name;
  } else if (err.name == "User not found" || err.name == "Invalid password") {
    status = 400;
    message = "Invalid email or password";
  } else if (err.name == "Genre not found" || err.name == "Movie not found") {
    status = 404;
    message = err.name;
  }

  res.status(status).json({ message });
});

module.exports = errorHandler;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class Helper {
  static hash(pass) {
    return bcrypt.hashSync(pass);
  }

  static compare(pass, hashed) {
    return bcrypt.compareSync(pass, hashed);
  }

  static sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRETKEY);
  }

  static verify(token) {
    return jwt.verify(token, process.env.JWT_SECRETKEY);
  }

  static slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }
}

module.exports = Helper;

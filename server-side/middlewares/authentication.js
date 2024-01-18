const Helper = require("../helpers");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    if (!req.headers.access_token) {
      throw {name: 'NoTokenFound'}
    } else {
      const { access_token } = req.headers;
      const payload = Helper.verify(access_token);
      const userData = await User.findOne({ where: { email: payload.email } });
      if (!userData) {
        throw {name: "UserNotFound"}
      } else {
        req.user = {
          id: payload.id,
          email: payload.email,
          username: payload.username,
        };
        next();
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authentication
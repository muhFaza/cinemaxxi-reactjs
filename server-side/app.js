if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const routerAdmin = require("./routes/admin");
const routerUser = require("./routes/user");
const errorHandler = require("./middlewares/errorHandler");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/admin", routerAdmin);
app.use("/user", routerUser);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

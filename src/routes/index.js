const routes = require("express").Router();

routes.route("/api/user/login").post(function (req, res) {
  res.send("login users");
});

module.exports = routes;

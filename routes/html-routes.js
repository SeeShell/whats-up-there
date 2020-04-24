// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  const styleArray = [
    { stylesheet: "stylesheets/signup-style.css" },
    { stylesheet: "stylesheets/login-style.css" },
    { stylesheet: "stylesheets/member-style.css" },
    { stylesheet: "stylesheets/map-style.css" }
  ];

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup", styleArray[0]);
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login", styleArray[1]);
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members", styleArray[2]);
  });

  app.get("/maps", isAuthenticated, function(req, res) {
    res.render("map");
  });
};

const db = require("../models");

module.exports = function(app) {
  app.get("/api/user_favorites", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.Favorites.findAll({
        includes: db.Users,
        where: db.Favorites.UserId === req.user.id
      }).then(userAll => {
        const userFavs = userAll.map(fav => {
          return {
            id: fav.dataValues.id,
            satName: fav.dataValues.satName,
            satID: fav.dataValues.satID,
            nickname: fav.dataValues.nickname,
            launchDate: fav.dataValues.launchDate
          };
        });
        res.json(userFavs);
      });
    }
  });

  // app.post("/api/user_favorites", function(req, res) {
  //     db.Favorites.create({
  //         satName: req.body.satName,
  //         satID: req.body.satID,
  //         nickname: req.body.nickname,
  //         launchDate: req.body.launchDate
  //     }).then(function() {
  //         res.status(200);
  //     });
  // });
};

const db = require("../models");

module.exports = function(app) {
  app.get("/api/user_favorites", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.Favorites.findAll({
        where: { UserId: req.user.id }
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

  app.delete("/api/remove_user_favorites/:id", (req, res) => {
    db.Favorites.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/new_user_favorites", function(req, res) {
    db.Favorites.create({
      satName: req.body.satName,
      satID: req.body.satID,
      nickname: req.body.nickname,
      UserId: req.body.UserId
    }).then(function(data) {
      res.json(data);
    });
  });

  app.put("/api/user_favorites_new_nickname", (req, res) => {
    db.Favorites.update(
      {
        nickname: req.body.nickname
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(data) {
      res.json(data);
    });
  });
};

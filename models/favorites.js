module.exports = function(sequelize, DataTypes) {
  const Favorites = sequelize.define("Favorites", {
    satName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    satID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Favorites.associate = function(models) {
    Favorites.belongsTo(models.User, {
      foreignKey: {
        onDelete: "CASCADE",
        allowNull: false
      }
    });
  };

  return Favorites;
};

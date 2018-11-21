const bcrypt = require("bcrypt-nodejs")
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 45]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    small_wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    small_losses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    small_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    small_best_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    small_win_rate: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    small_avg_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    medium_wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    medium_losses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    medium_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    medium_best_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    medium_win_rate: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    medium_avg_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    large_wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    large_losses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    large_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    large_best_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    large_win_rate: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    large_avg_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  Users.hook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return Users;
}
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Location = sequelize.define("Location", {
  latitude: {
    type: DataTypes.DECIMAL(10,8),
    allowNull: false
  },
  longitude: {
    type: DataTypes.DECIMAL(11,8),
    allowNull: false
  }
}, {
  tableName: 'location'
});

User.hasOne(Location, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Location.belongsTo(User, {
  foreignKey: "user_id"
});

module.exports = Location;
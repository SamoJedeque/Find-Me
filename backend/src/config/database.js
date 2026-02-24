const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("geodb", "postgres", "84526684869", {
host: "localhost",
dialect: "postgres"
});

module.exports = sequelize;

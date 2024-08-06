const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../../.env"),
});

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DB_DATABASE;
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const CA = process.env.DB_CA;

module.exports = {
  development: {
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    port: PORT,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    dialectOptions: {
      ssl: {
        ca: CA,
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    port: PORT,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    dialectOptions: {
      ssl: {
        ca: CA,
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    port: PORT,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    dialectOptions: {
      ssl: {
        ca: CA,
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

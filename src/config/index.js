const dotenv = require('dotenv')
const mysql = require("mysql2");


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config()

if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
    port: parseInt(process.env.PORT, 10),
};
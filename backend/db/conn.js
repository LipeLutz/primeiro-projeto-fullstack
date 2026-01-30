require('dotenv').config()
const mysql = require('mysql2')

const pool = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: 3307,
    database: "flamengomatches"
})

module.exports = pool
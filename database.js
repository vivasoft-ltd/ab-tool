const mysql = require('mysql2/promise')
require('dotenv').config()

const Database = {
    connection: null,
    async connect(db_name) {
        db_name = db_name || process.env.DB_NAME
        this.connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: db_name
        });
    }
}

module.exports = Database

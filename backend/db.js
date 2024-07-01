const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Salir de la aplicación en caso de error
    } else {
        console.log('Connected to the database');
    }
});

module.exports = connection;
const mysql = require('promise-mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tupassword',
    database: 'electron_prueba',
});

const getConnection = () => {
    return connection;
}

module.exports = {
    getConnection,
}
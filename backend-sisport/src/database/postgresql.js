const { Pool } = require('pg');

/*  
    * Parámetros de conexión a PostgreSQL
    * Información colocada en el archivo .env del servidor
*/
const pool = new Pool({

    user: process.env.pguser,
    host: process.env.pghost,
    password: process.env.pgpassword,
    database: process.env.pgdatabase,
    port: process.env.pgport

});


/*
    * Conexión a la BD de PostgreSQL (comprueba si se realizó con éxito)
*/
pool.connect((err, client, done) => {

    err ? console.error("BD POSTGRESQL: ", err.message) : console.log("BD POSTGRESQL: CONECTADO");

});

module.exports = pool;
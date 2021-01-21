const { Pool } = require('pg');

const pool = new Pool({

    user: process.env.pguser,
    host: process.env.pghost,
    password: process.env.pgpassword,
    database: process.env.pgdatabase,
    port: process.env.pgport

});


pool.connect((err, client, done) => {

    if (err) {

        console.error("BD POSTGRESQL: ", err.message);

    } else {

        console.log("BD POSTGRESQL: CONECTADO");

    }

});

module.exports = pool;
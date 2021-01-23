const mongoose = require('mongoose');

const URI = process.env.mongouri;

/*  
    * Parámetros de conexión a MongoDB
    * Información colocada en el archivo .env del servidor
*/
mongoose.connect(URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
        authSource: "admin",
        user: "server",
        pass: "Server2021"

    }).then(db => console.log("BD MONGODB: CONECTADO")) // Promesa de conexión a la BD de MongoDB
    .catch(err => console.error("BD MONGODB: ", +err));

module.exports = mongoose;

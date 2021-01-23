const express = require("express");

const morgan = require("morgan");

const app = express();

//PUERTO DEL SERVIDOR
app.set('port', process.env.portserver); //Información colocada en el archivo .env

//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'));

//BASES DE DATOS
require('./database/mongodb')

//ARCHIVO DE RUTAS DEL SERVIDOR
require('./routes/index')(app)

module.exports = app;
const express = require("express");

const morgan = require("morgan");
const cors = require("cors");
const app = express();

//PUERTO DEL SERVIDOR
app.set('port', process.env.portserver); //Información colocada en el archivo .env

//MIDDLEWARES
app.use(cors({origin:'*',methods:['GET','POST','PUT','DELETE'],credentials:true}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'));

//BASES DE DATOS
require('./database/mongodb')

//ARCHIVO DE RUTAS DEL SERVIDOR
require('./routes/index')(app)

module.exports = app;
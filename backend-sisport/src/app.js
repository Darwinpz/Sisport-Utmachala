const express = require("express");

const morgan = require("morgan");

const app = express();

app.set('port', process.env.PORT || 80);


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'));


require('./routes/index')(app)

module.exports = app;
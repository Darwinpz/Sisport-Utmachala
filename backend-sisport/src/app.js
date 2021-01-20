const express = require("express");


const app = express();

app.set('port', process.env.PORT || 80);



require('./routes/index')(app)

module.exports = app;
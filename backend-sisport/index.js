require('dotenv').config();

const app = require("./src/app");


app.listen(app.get('port'),()=>{

    console.log("Servidor iniciado, Puerto: ",app.get('port'));

});
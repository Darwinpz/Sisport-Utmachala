const app = require("../app");

module.exports = (app) => {


    app.get('/',(req,res)=>{

        res.status(200).json("HOLA MUNDO");

    });

}
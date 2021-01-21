const app = require("../app");

const universidad = require("../controllers/universidad");


module.exports = (app) => {


    //UNIVERSIDADES
    app.get('/api/universidad', universidad.all);
    app.post('/api/universidad/add', universidad.add);
    app.put('/api/universidad/put', universidad.put);
    app.delete('/api/universidad/delete', universidad.delete);

    //FACULTADES

    //CARERRAS

    //SEMESTRES

    //PERIODOS

    //HORARIOS

    //PERSONAS

    //FAMILIARES

    //PERSONAS_ASIGNATURAS

    //ASIGNATURAS


    //ERRORES
    app.use(function (err, req, res, next) {

        res.status(err.status).json({ "message": err.message });

    })



}
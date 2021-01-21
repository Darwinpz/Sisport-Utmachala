const app = require("../app");
const universidad = require("../controllers/universidad");
const facultad = require("../controllers/facultad");
const carrera = require("../controllers/carrera");
const semestre = require("../controllers/semestre");

module.exports = (app) => {


    //UNIVERSIDADES
    app.get('/api/universidad', universidad.all);
    app.post('/api/universidad/add', universidad.add);
    app.put('/api/universidad/put', universidad.put);
    app.delete('/api/universidad/delete', universidad.delete);
    app.get('/api/universidad/find', universidad.find);
    
    //FACULTADES
    app.get('/api/facultad', facultad.all);
    app.post('/api/facultad/add', facultad.add);
    app.put('/api/facultad/put', facultad.put);
    app.delete('/api/facultad/delete', facultad.delete);

    //CARERRAS
    app.get('/api/carrera', carrera.all);
    app.post('/api/carrera/add', carrera.add);
    app.put('/api/carrera/put', carrera.put);
    app.delete('/api/carrera/delete', carrera.delete);

    //SEMESTRES
    app.get('/api/semestre', semestre.all);
    app.post('/api/semestre/add', semestre.add);
    app.put('/api/semestre/put', semestre.put);
    app.delete('/api/semestre/delete', semestre.delete);

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
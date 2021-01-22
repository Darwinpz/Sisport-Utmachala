const app = require("../app");
const universidad = require("../controllers/universidad");
const facultad = require("../controllers/facultad");
const carrera = require("../controllers/carrera");
const semestre = require("../controllers/semestre");

const periodo = require("../controllers/periodo");
const horario = require("../controllers/horario");
const persona = require("../controllers/persona");
const familiar = require("../controllers/familiar");
const persona_asignatura = require("../controllers/persona_asignatura");
const asignatura = require("../controllers/asignatura");

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
    app.get('/api/periodo', periodo.all);
    app.post('/api/periodo/add', periodo.add);
    app.put('/api/periodo/put', periodo.put);
    app.delete('/api/periodo/delete', periodo.delete);

    //HORARIOS
    app.get('/api/horario', horario.all);
    app.post('/api/horario/add', horario.add);
    app.put('/api/horario/put', horario.put);
    app.delete('/api/horario/delete', horario.delete);

    //PERSONAS
    app.get('/api/persona', persona.all);
    app.post('/api/persona/add', persona.add);
    app.put('/api/persona/put', persona.put);
    app.delete('/api/persona/delete', persona.delete);

    //FAMILIARES
    app.get('/api/familiar', familiar.all);
    app.post('/api/familiar/add', familiar.add);
    app.put('/api/familiar/put', familiar.put);
    app.delete('/api/familiar/delete', familiar.delete);

    //PERSONAS_ASIGNATURAS
    app.get('/api/persona_asignatura', persona_asignatura.all);
    app.post('/api/persona_asignatura/add', persona_asignatura.add);
    app.put('/api/persona_asignatura/put', persona_asignatura.put);
    app.delete('/api/persona_asignatura/delete', persona_asignatura.delete);

    //ASIGNATURAS
    app.get('/api/asignatura', asignatura.all);
    app.post('/api/asignatura/add', asignatura.add);
    app.put('/api/asignatura/put', asignatura.put);
    app.delete('/api/asignatura/delete', asignatura.delete);


    //ERRORES
    app.use(function (err, req, res, next) {

        res.status(err.status).json({ "message": err.message });

    })



}
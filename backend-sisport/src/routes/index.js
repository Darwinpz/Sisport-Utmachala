const app = require("../app");

/*
    * Instancia de los Controladores de ruta
*/
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

/*
    * Instancia de los modelos de la BD MongoDB
*/
const portafolio = require("../controllers/portafolio");
const esquema = require("../controllers/esquemas");
const estructura = require("../controllers/estructuras");

module.exports = (app) => {

    //RUTAS DE LAS UNIVERSIDADES
    app.get('/api/universidad', validarToken, universidad.all);
    app.get('/api/universidad/:id', validarToken, universidad.find);
    app.post('/api/universidad/add', validarToken, universidad.add);
    app.put('/api/universidad/put', validarToken, universidad.put);
    app.delete('/api/universidad/delete', validarToken, universidad.delete);

    //RUTAS DE LAS FACULTADES
    app.get('/api/facultad', validarToken, facultad.all);
    app.get('/api/facultad/:id', validarToken, facultad.find);
    app.post('/api/facultad/add', validarToken, facultad.add);
    app.put('/api/facultad/put', validarToken, facultad.put);
    app.delete('/api/facultad/delete', validarToken, facultad.delete);

    //RUTAS DE LAS CARERRAS
    app.get('/api/carrera', validarToken, carrera.all);
    app.get('/api/carrerasandfacultad', validarToken, carrera.allxfacultad);
    app.get('/api/carrera/:id', validarToken, carrera.find);
    app.post('/api/carrera/add', validarToken, carrera.add);
    app.put('/api/carrera/put', validarToken, carrera.put);
    app.delete('/api/carrera/delete', validarToken, carrera.delete);

    //RUTAS DE LOS SEMESTRES
    app.get('/api/semestre', validarToken, semestre.all);
    app.get('/api/semestre/:id', validarToken, semestre.find);
    app.post('/api/semestre/add', validarToken, semestre.add);
    app.put('/api/semestre/put', validarToken, semestre.put);
    app.delete('/api/semestre/delete', validarToken, semestre.delete);

    //RUTAS DE LOS PERIODOS
    app.get('/api/periodo', validarToken, periodo.all);
    app.get('/api/periodo/:id', validarToken, periodo.find);
    app.post('/api/periodo/add', validarToken, periodo.add);
    app.put('/api/periodo/put', validarToken, periodo.put);
    app.delete('/api/periodo/delete', validarToken, periodo.delete);

    //RUTAS DE LOS HORARIOS
    app.get('/api/horario', validarToken, horario.all);
    app.get('/api/horario/:id', validarToken, horario.find);
    app.post('/api/horario/add', validarToken, horario.add);
    app.put('/api/horario/put', validarToken, horario.put);
    app.delete('/api/horario/delete', validarToken, horario.delete);

    //RUTAS DE LAS PERSONAS
    app.get('/api/persona', validarToken, persona.all);
    app.get('/api/persona/perfil', validarToken, persona.perfil);
    app.post('/api/persona/login', persona.login);
    app.post('/api/persona/add', validarToken, persona.add);
    app.put('/api/persona/put', validarToken, persona.put);
    app.delete('/api/persona/delete', validarToken, persona.delete);
    app.get('/api/persona/:id', validarToken, persona.find);

    //RUTAS DE LOS FAMILIARES
    app.get('/api/familiar', validarToken, familiar.all);
    app.get('/api/familiar/:id', validarToken, familiar.find);
    app.post('/api/familiar/add', validarToken, familiar.add);
    app.put('/api/familiar/put', validarToken, familiar.put);
    app.delete('/api/familiar/delete', validarToken, familiar.delete);

    //RUTAS DE LAS PERSONAS_ASIGNATURAS
    app.get('/api/persona_asignatura', validarToken, persona_asignatura.all);
    app.get('/api/persona_asignatura/:id', validarToken, persona_asignatura.find);
    app.post('/api/persona_asignatura/add', validarToken, persona_asignatura.add);
    app.put('/api/persona_asignatura/put', validarToken, persona_asignatura.put);
    app.delete('/api/persona_asignatura/delete', validarToken, persona_asignatura.delete);


    //RUTAS DE LAS ASIGNATURAS
    app.get('/api/asignatura', validarToken, asignatura.all);
    app.post('/api/asignatura/buscar', validarToken, asignatura.buscar);
    app.post('/api/asignatura/add', validarToken, asignatura.add);
    app.put('/api/asignatura/put', validarToken, asignatura.put);
    app.delete('/api/asignatura/delete', validarToken, asignatura.delete);
    app.get('/api/asignatura/:id', validarToken, asignatura.find);

    //RUTAS ESQUEMAS 
    app.post('/api/esquemas/add', esquema.add)

    //RUTAS DE ESTRUCTURA DE LA ASIGNATURA (NOSQL)
    app.post('/api/estructura/add', estructura.add)

    //RUTAS DEL PORTAFOLIO
    app.get('/api/portafolio/add', portafolio.add)

    function validarToken(req, res, next) {

        var token = req.headers['authorization']

        if (typeof token !== 'undefined') {

            req.token = token.split(" ")[1];
            next()

        } else {

            res.status(403).json({ "message": "Falta autorizacion" })

        }

    }

    //GESTIÓN DE ERRORES
    app.use(function (err, req, res, next) {

        res.status(err.status).json({ "message": err.message });

    })


}
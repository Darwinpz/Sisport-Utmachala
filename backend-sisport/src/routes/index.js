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
    app.post('/api/carrera/findfacultad', validarToken, carrera.findfacultad);
    app.get('/api/carrera/:id', validarToken, carrera.find);
    app.post('/api/carrera/add', validarToken, carrera.add);
    app.put('/api/carrera/put', validarToken, carrera.put);
    app.delete('/api/carrera/delete', validarToken, carrera.delete);

    //RUTAS DE LOS SEMESTRES
    app.get('/api/semestre', validarToken, semestre.all);
    app.post('/api/semestre/add', validarToken, semestre.add);
    app.post('/api/semestre/addsemestre_periodo', validarToken, semestre.addsemestre_periodo);
    app.put('/api/semestre/put', validarToken, semestre.put);
    app.delete('/api/semestre/delete', validarToken, semestre.delete);
    app.post('/api/semestre/find', validarToken, semestre.find);
    app.post('/api/semestre/findperiodocarrera', validarToken, semestre.findPeriodoCarrera);
    app.post('/api/semestre/findparalelos', validarToken, semestre.findparalelos);

    //RUTAS DE LOS PERIODOS
    app.get('/api/periodo', validarToken, periodo.all);
    app.post('/api/periodo/find', validarToken, periodo.find);
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
    app.post('/api/persona/rol', validarToken, persona.all_rol);
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
    app.post('/api/persona_asignatura/matriculados', validarToken, persona_asignatura.matriculadosxasignaturas);
    app.post('/api/persona_asignatura/add', validarToken, persona_asignatura.add);
    app.put('/api/persona_asignatura/put', validarToken, persona_asignatura.put);
    app.delete('/api/persona_asignatura/delete', validarToken, persona_asignatura.delete);
    app.get('/api/persona_asignatura/:id', validarToken, persona_asignatura.find);

    //RUTAS DE LAS ASIGNATURAS
    app.get('/api/asignatura', validarToken, asignatura.all);
    app.get('/api/asignatura/all', validarToken, asignatura.allcoordinador);
    app.post('/api/asignatura/buscar', validarToken, asignatura.buscar);
    app.post('/api/asignatura/addestado', validarToken, asignatura.addestado);
    app.post('/api/asignatura/add', validarToken, asignatura.add);
    app.put('/api/asignatura/put', validarToken, asignatura.put);
    app.delete('/api/asignatura/delete', validarToken, asignatura.delete);
    app.post('/api/asignatura/find', validarToken, asignatura.find);

    //RUTAS ESQUEMAS 
    app.post('/api/esquemas/add', esquema.add)

    //RUTAS DE ESTRUCTURA DE LA ASIGNATURA (NOSQL)
    app.post('/api/estructura/add', validarToken, estructura.add)
    app.post('/api/estructura/remove', validarToken, estructura.remove)

    //RUTAS DEL PORTAFOLIO
    app.post('/api/portafolio/add', validarToken, portafolio.add)
    app.post('/api/portafolio/remove', validarToken, portafolio.remove)
    app.post('/api/portafolio/getdiario',validarToken, portafolio.getDiario)
    app.post('/api/portafolio/diario',validarToken, portafolio.updateDiario)
    app.post('/api/portafolio/getinforme',validarToken, portafolio.getinforme)
    app.post('/api/portafolio/informe',validarToken, portafolio.updateInforme)
    app.post('/api/portafolio/getexpectativas',validarToken, portafolio.getExpectativas)
    app.post('/api/portafolio/expectativas',validarToken, portafolio.updateExpectativas)
    app.post('/api/portafolio/uploadfiles',validarToken, portafolio.uploadfiles)
    app.post('/api/portafolio/removefiles',validarToken, portafolio.removefiles)
    app.post('/api/portafolio/find', validarToken, portafolio.find)


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
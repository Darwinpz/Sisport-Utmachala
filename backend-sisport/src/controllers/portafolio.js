
//const PortafolioSchema = require('../models/portafolio')

const EstructuraSchema = require('../models/estructura')
const jwt = require("jsonwebtoken")
const PortafolioCtrl = {};

PortafolioCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const { asig_codigo, peri_codigo, nombre_esquema } = req.body

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                busqueda.portafolios.push(portafolio(per_codigo))

                await busqueda.save()

                res.status(200).json({ "message": "Portafolio Creado" });

            }
        })


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}


PortafolioCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const { asig_codigo, peri_codigo, nombre_esquema } = req.body

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                const portafolio = busqueda.portafolios.filter(portafolio => portafolio.datos_informativos.cod_estudiante == per_codigo)

                res.status(200).json({ "message": portafolio });

            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

function portafolio(per_codigo) {

    const obj = {

        datos_informativos: {

            cod_estudiante: per_codigo
        },

        elementos_curriculares: {

            expectativas: {},
            apuntes: [],
            evaluaciones: [],
            investigaciones: [],
            actividades: [],
            proyectos: [],
            casos_estudio: [],
            planteamientos: [],
            asistencia: {},
            observaciones: [],
            intraclases: [],
            autonomos: [],
            refuerzo: []

        },

        informe_final: {}

    }

    return obj

}


module.exports = PortafolioCtrl;
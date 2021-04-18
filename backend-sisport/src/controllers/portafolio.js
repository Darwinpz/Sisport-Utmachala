
//const PortafolioSchema = require('../models/portafolio')

const EstructuraSchema = require('../models/estructura')
const jwt = require("jsonwebtoken")
const PortafolioCtrl = {};
const pool = require("../database/postgresql")

PortafolioCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const { asig_codigo, peri_codigo, clave } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura+"."+carrera_facultad.rows[0].car_abreviatura+"."+"esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda!=null && busqueda.generales.clave == clave){

                    busqueda.portafolios.push(portafolio(per_codigo))

                    await busqueda.save()

                    await pool.query("INSERT INTO public.persona_asignatura (per_codigo, asig_codigo, peri_codigo) values($1,$2,$3)", [per_codigo, asig_codigo, peri_codigo]);

                    res.status(200).json({ "message": "Portafolio Creado" });

                }else{

                    res.status(400).json({ "message": 'Clave incorrecta' });

                }


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

                const { asig_codigo, peri_codigo, per_codigo } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura+"."+carrera_facultad.rows[0].car_abreviatura+"."+"esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                const portafolio = busqueda.portafolios.filter(portafolio => portafolio.datos_informativos.cod_estudiante == per_codigo)

                res.status(200).json({ "message": [{estructura:busqueda.generales,portafolio}] });

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
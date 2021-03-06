
const EstructuraSchema = require('../models/estructura')
const pool = require("../database/postgresql")
const jwt = require("jsonwebtoken")

const EstructuraCtrl = {};

EstructuraCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const { asig_codigo, peri_codigo, clave } = req.body;

                const docente_codigo = data.usuario.per_codigo;
                const nombre_docente = data.usuario.per_titulo+" "+ data.usuario.per_nombre+" " + data.usuario.per_apellido;

                const periodo = await pool.query("SELECT *FROM periodo WHERE peri_codigo = $1", [peri_codigo]);

                const periodos = periodo.rows[0];

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                var semanas = total_semanas(periodos.peri_fecha_inicial, periodos.peri_fecha_final)

                const asignatura = await pool.query("SELECT asig_nombre, asig_identificador FROM asignatura where asig_codigo=$1", [asig_codigo]);

                const horario = await pool.query("SELECT count(hor_codigo) FROM horario WHERE asig_codigo=$1 and peri_codigo=$2", [asig_codigo, peri_codigo]);

                const cant_diarios = parseInt(horario.rows[0].count) * parseInt(semanas);

                const estructura = EstructuraSchema.add(nombre_esquema);

                const estructuraModel = new estructura();

                estructuraModel.generales.cod_asignatura = asig_codigo;
                estructuraModel.generales.periodo = peri_codigo;
                estructuraModel.generales.nombre_asignatura = asignatura.rows[0].asig_nombre;
                estructuraModel.generales.contenidos = [];
                estructuraModel.generales.cod_docente = docente_codigo;
                estructuraModel.generales.nombre_docente = nombre_docente;
                estructuraModel.generales.diarios = cant_diarios;
                estructuraModel.generales.clave = clave;
                estructuraModel.generales.identificador = asignatura.rows[0].asig_identificador;

                await estructuraModel.save();

                await pool.query("UPDATE asignatura_estado set asig_est_estado=$1  where asig_est_asig_codigo=$2 and asig_est_peri_codigo=$3 ", [true, asig_codigo, peri_codigo]);

                res.status(200).json({ "message": "Estructura Creada" });

            }
        })


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        console.log(err)
        next(err);

    }


}



EstructuraCtrl.remove = async (req, res, next) => {

    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const { asig_codigo, peri_codigo } = req.body;

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                await busqueda.remove();

                await pool.query("UPDATE asignatura_estado set asig_est_estado=$1  where asig_est_asig_codigo=$2 and asig_est_peri_codigo=$3 ", [false, asig_codigo, peri_codigo]);

                res.status(200).json({ "message": "Estructura Eliminada" });

            }
        })


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        console.log(err)
        next(err);

    }


}


function total_semanas(fecha_inicio, fecha_fin) {

    var inicio = new Date(fecha_inicio);
    var fin = new Date(fecha_fin);
    var cant_dias = fin.getTime() - inicio.getTime();

    return Math.round(cant_dias / (1000 * 60 * 60 * 24 * 7));
}


module.exports = EstructuraCtrl;
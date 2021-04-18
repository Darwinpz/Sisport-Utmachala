
const EstructuraSchema = require('../models/estructura')
const pool = require("../database/postgresql")

const EstructuraCtrl = {};

EstructuraCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {



                const { nombre_esquema, asig_codigo, peri_codigo, asig_nombre, clave } = req.body;

                const docente_codigo = "data.usuario.per_codigo";
                const nombre_docente = "";

                const periodo = await pool.query("SELECT *FROM periodo WHERE peri_codigo = $1", [peri_codigo]);

                const periodos = periodo.rows[0];

                var semanas = total_semanas(periodos.peri_fecha_inicial, periodos.peri_fecha_final)

                const horario = await pool.query("SELECT count(hor_codigo) FROM horario WHERE asig_codigo=$1 and peri_codigo=$2", [asig_codigo, peri_codigo]);

                const cant_diarios = parseInt(horario.rows[0].count) * parseInt(semanas);

                const estructura = EstructuraSchema.add(nombre_esquema);

                const estructuraModel = new estructura();

                estructuraModel.generales.cod_asignatura = asig_codigo;
                estructuraModel.generales.periodo = peri_codigo;
                estructuraModel.generales.nombre_asignatura = asig_nombre;
                estructuraModel.generales.syllabus = "";
                estructuraModel.generales.contenidos = [];
                estructuraModel.generales.cod_docente = docente_codigo;
                estructuraModel.generales.nombre_docente = nombre_docente;
                estructuraModel.generales.diarios = cant_diarios;
                estructuraModel.generales.clave = clave;

                await estructuraModel.save();

                await pool.query("UPDATE asignatura_estado set asig_est_estado=$1  where asig_est_asig_codigo=$2 and asig_est_peri_codigo=$3 ", [true, asig_codigo, peri_codigo]);

                res.status(200).json({ "message": "Estructura Creada" });

            
        

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


function total_semanas(fecha_inicio, fecha_fin) {

    var inicio = new Date(fecha_inicio);
    var fin = new Date(fecha_fin);
    var cant_dias = fin.getTime() - inicio.getTime();

    return Math.round(cant_dias / (1000 * 60 * 60 * 24 * 7)) - 1;
}


module.exports = EstructuraCtrl;
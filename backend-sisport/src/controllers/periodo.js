const pool = require("../database/postgresql")

const PeriodoCtrl = {};

/*
    * Retorna todos los registros de los Periodos
*/
PeriodoCtrl.all = async (req, res, next) => {

    var err = new Error();

    try {

        const periodos = await pool.query("SELECT *FROM periodo ");

        res.status(200).json({ "message": periodos.rows });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Retorna un solo resultado de los registros de los Periodos
*/
PeriodoCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const { peri_codigo } = req.body;

        const periodo = await pool.query("SELECT *FROM periodo WHERE peri_codigo=$1", [peri_codigo]);

        const resultado = periodo.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Inserta a la BD un Periodo
*/
PeriodoCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo, peri_estado } = req.body;

        await pool.query("INSERT INTO periodo (peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo, peri_estado)"
            + " values($1,$2,$3,$4,$5)", [peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo, peri_estado]);

        res.status(200).json({ "message": "Periodo Agregado" });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Edita un Periodo de la BD
*/
PeriodoCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { peri_codigo, peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo, peri_estado } = req.body;

        const result = await pool.query("SELECT * from periodo as per where per.peri_codigo=$1", [peri_codigo])

        const periodo = result.rows[0]

        if (formatearFecha(periodo.peri_fecha_inicial) == peri_fecha_inicial && formatearFecha(periodo.peri_fecha_final) == peri_fecha_final && periodo.peri_nombre == peri_nombre) { 

            await pool.query("UPDATE periodo SET peri_nombre=$2, sem_codigo=$3, peri_estado=$4 WHERE peri_codigo=$1", [peri_codigo, peri_nombre, sem_codigo, peri_estado]);

            res.status(200).json({ "message": "Periodo Editado" });

        } else {

            const dependencias = await pool.query("SELECT * from periodo as per, horario as hor where  per.peri_codigo = hor.peri_codigo and per.peri_codigo=$1", [peri_codigo])

            if (dependencias.rowCount > 0) {

                res.status(400).json({ "message": "No se puede editar el periodo" });

            } else {

                await pool.query("UPDATE periodo SET peri_nombre=$2, peri_fecha_inicial=$3, peri_fecha_final=$4, sem_codigo=$5, peri_estado=$6"
                    + "WHERE peri_codigo=$1", [peri_codigo, peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo, peri_estado]);

                res.status(200).json({ "message": "Periodo Editado" });

            }


        }



    } catch (e) {

        err.message = e.message;
        console.log(err)
        err.status = 500;
        next(err);

    }


}

function formatearFecha(fecha) {

    return fecha.getFullYear() + "-" + ('0' + (fecha.getMonth() + 1)).slice(-2) + "-" + ('0' + (fecha.getDate())).slice(-2)

}

/*
    * Borra un Periodo de la BD
*/
PeriodoCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { peri_codigo } = req.body;

        await pool.query("DELETE FROM periodo WHERE peri_codigo=$1", [peri_codigo]);

        res.status(200).json({ "message": "Periodo Eliminado" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

module.exports = PeriodoCtrl;
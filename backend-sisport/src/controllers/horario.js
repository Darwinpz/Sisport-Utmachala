const pool = require("../database/postgresql")

const HorarioCtrl = {};

/*
    * Retorna todos los registros de los Horarios
*/
HorarioCtrl.all = async (req, res, next) => {

    var err = new Error();

    try {

        const horarios = await pool.query("SELECT *FROM horario");

        res.status(200).json({ "message": horarios.rows });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Retorna un solo resultado de los registros de los Horarios
*/
HorarioCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const hor_codigo = req.params.id;

        const horario = await pool.query("SELECT *FROM horario WHERE hor_codigo=$1", [hor_codigo]);

        const resultado = horario.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Inserta a la BD un Horario
*/
HorarioCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        //const { hor_dia, hor_hora_inicial, hor_hora_final, hor_cant_horas, asig_codigo, peri_codigo, hor_num_dia } = req.body;

        const { arreglo, asig_codigo, peri_codigo } = req.body

        var dia_temp = 0;
        var fin_temp = "";

        if (arreglo.length > 0) {

            for (var i = 0; i < arreglo.length; i++) {

                var dia = arreglo[i]

                if (dia.num_dia == dia_temp && dia.inicio == fin_temp) {

                    await pool.query("UPDATE horario set hor_hora_final=$1, hor_cant_horas=hor_cant_horas+1 where asig_codigo=$2 and peri_codigo=$3"
                        , [dia.fin, asig_codigo, peri_codigo]);

                } else {

                    await pool.query("INSERT INTO horario (hor_dia, hor_hora_inicial, hor_hora_final, hor_cant_horas, asig_codigo, peri_codigo, hor_num_dia)"
                        + " values($1,$2,$3,$4,$5,$6,$7)", [obtener_dia(dia.num_dia), dia.inicio, dia.fin, 1, asig_codigo, peri_codigo, dia.num_dia]);

                    dia_temp = dia.num_dia;
                    fin_temp = dia.fin;
                }

            }

            await pool.query("UPDATE asignatura_estado set asig_est_estado=$1 where asig_est_asig_codigo=$2 and asig_est_peri_codigo=$3"
                , [true,asig_codigo,peri_codigo]);

            res.status(200).json({ "message": "Horario Agregado" });
        }


    } catch (e) {

        err.message = e.message;
        console.log(err.message)
        err.status = 500;
        next(err);

    }


}

function obtener_dia(num_dia) {

    var dias = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES'];

    return dias[num_dia - 1];

}


/*
    * Edita un Horario de la BD
*/
HorarioCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { hor_codigo, hor_dia, hor_hora_inicial, hor_hora_final, hor_cant_horas, asig_codigo, peri_codigo, hor_num_dia } = req.body;

        await pool.query("UPDATE asignatura SET hor_dia=$2, hor_hora_inicial=$3, hor_hora_final=$4, hor_cant_horas=$5, asig_codigo=$6, peri_codigo=$7, hor_num_dia=$8"
            + " WHERE hor_codigo=$1", [hor_codigo, hor_dia, hor_hora_inicial, hor_hora_final, hor_cant_horas, asig_codigo, peri_codigo, hor_num_dia]);

        res.status(200).json({ "message": "Horario Editado" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Borra un Horario de la BD
*/
HorarioCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { hor_codigo } = req.body;

        await pool.query("DELETE FROM horario WHERE hor_codigo=$1", [hor_codigo]);

        res.status(200).json({ "message": "Horario Eliminado" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

module.exports = HorarioCtrl;
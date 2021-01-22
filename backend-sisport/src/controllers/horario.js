const pool = require("../database/postgresql")

const HorarioCtrl = {};


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

HorarioCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { hor_dia, hor_hora_inicial, hor_hora_final, hor_cant_horas, asig_codigo, peri_codigo, hor_num_dia } = req.body;

        await pool.query("INSERT INTO horario (hor_dia, hor_hora_inicial, hor_hora_final, hor_cant_horas, asig_codigo, peri_codigo, hor_num_dia)"
            + "values($1,$2,$3,$4,$5,$6,$7)", [hor_dia, hor_hora_inicial, hor_hora_final, hor_cant_horas, asig_codigo, peri_codigo, hor_num_dia]);

        res.status(200).json({ "message": "Horario Agregado" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


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
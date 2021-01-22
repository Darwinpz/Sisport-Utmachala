const pool = require("../database/postgresql")

const AsignaturaCtrl = {};


AsignaturaCtrl.all = async (req, res, next) => {

    var err = new Error();

    try {

        const asignaturas = await pool.query("SELECT *FROM asignatura");

        res.status(200).json({ "message": asignaturas.rows });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}


AsignaturaCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { asig_nombre, sem_codigo } = req.body;

        await pool.query("INSERT INTO asignatura (asig_nombre, sem_codigo) values($1,$2)", [asig_nombre, sem_codigo]);

        res.status(200).json({ "message": "Asignatura Agregada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


AsignaturaCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { asig_codigo, asig_nombre, sem_codigo } = req.body;

        await pool.query("UPDATE asignatura SET asig_nombre=$2, sem_codigo=$3 WHERE asig_codigo=$1", [asig_codigo, asig_nombre, sem_codigo]);

        res.status(200).json({ "message": "Asignatura Editada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


AsignaturaCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { asig_codigo } = req.body;

        await pool.query("DELETE FROM asignatura WHERE asig_codigo=$1", [asig_codigo]);

        res.status(200).json({ "message": "Asignatura Eliminada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

module.exports = AsignaturaCtrl;
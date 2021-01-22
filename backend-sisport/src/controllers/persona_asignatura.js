const pool = require("../database/postgresql")

const PerAsigCtrl = {};


PerAsigCtrl.all = async (req, res, next) => {

    var err = new Error();

    try {

        const personas_asignaturas = await pool.query("SELECT *FROM persona_asignatura");

        res.status(200).json({ "message": personas_asignaturas.rows });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

PerAsigCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const perasig_codigo = req.params.id;

        const persona_asignatura = await pool.query("SELECT *FROM persona_asignatura WHERE perasig_codigo=$1", [perasig_codigo]);

        const resultado = persona_asignatura.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

PerAsigCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { per_codigo, asig_codigo, peri_codigo } = req.body;

        await pool.query("INSERT INTO persona_asignatura (per_codigo, asig_codigo, peri_codigo) values($1,$2,$3)", [per_codigo, asig_codigo, peri_codigo]);

        res.status(200).json({ "message": "Persona_Asignatura Agregada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


PerAsigCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { perasig_codigo, per_codigo, asig_codigo, peri_codigo } = req.body;

        await pool.query("UPDATE persona_asignatura SET per_codigo=$2, asig_codigo=$3 peri_codigo=$4 WHERE perasig_codigo=$1",
            [perasig_codigo, per_codigo, asig_codigo, peri_codigo]);

        res.status(200).json({ "message": "Persona_Asignatura Editada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


PerAsigCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { perasig_codigo } = req.body;

        await pool.query("DELETE FROM persona_asignatura WHERE perasig_codigo=$1", [perasig_codigo]);

        res.status(200).json({ "message": "Persona_Asignatura Eliminada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

module.exports = PerAsigCtrl;
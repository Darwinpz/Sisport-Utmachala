const pool = require("../database/postgresql")

const FamiliarCtrl = {};


FamiliarCtrl.all = async (req, res, next) => {

    var err = new Error();

    try {

        const familiares = await pool.query("SELECT *FROM familiares");

        res.status(200).json({ "message": familiares.rows });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

FamiliarCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const fam_codigo = req.params.id;

        const familiar = await pool.query("SELECT *FROM familiares WHERE fam_codigo=$1", [fam_codigo]);

        const resultado = familiar.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

FamiliarCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { fam_nombre, fam_apellido, fam_trabajo, fam_direcc_trabajo, fam_domicilio, fam_telef_celular, per_codigo, fam_tipo } = req.body;

        await pool.query("INSERT INTO familiares (fam_nombre, fam_apellido, fam_trabajo, fam_direcc_trabajo, fam_domicilio, fam_telef_celular, per_codigo, fam_tipo)"
            + "values($1,$2,$3,$4,$5,$6,$7,$8)", [fam_nombre, fam_apellido, fam_trabajo, fam_direcc_trabajo, fam_domicilio, fam_telef_celular, per_codigo, fam_tipo]);

        res.status(200).json({ "message": "Familiar Agregado" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


FamiliarCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { fam_codigo, fam_nombre, fam_apellido, fam_trabajo, fam_direcc_trabajo, fam_domicilio, fam_telef_celular, per_codigo, fam_tipo } = req.body;

        await pool.query("UPDATE familiares SET fam_nombre=$2, fam_apellido=$3, fam_trabajo=$4, fam_direcc_trabajo=$5, fam_domicilio=$6, fam_telef_celular=$7, per_codigo=$8, fam_tipo=$9"
            + "WHERE fam_codigo=$1", [fam_codigo, fam_nombre, fam_apellido, fam_trabajo, fam_direcc_trabajo, fam_domicilio, fam_telef_celular, per_codigo, fam_tipo]);

        res.status(200).json({ "message": "Familiar Editado" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


FamiliarCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { fam_codigo } = req.body;

        await pool.query("DELETE FROM familiares WHERE fam_codigo=$1", [fam_codigo]);

        res.status(200).json({ "message": "Familiar Eliminado" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

module.exports = FamiliarCtrl;
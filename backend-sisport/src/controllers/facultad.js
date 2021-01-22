const pool = require("../database/postgresql")

const FacultadCtrl = {};


FacultadCtrl.all = async (req, res, next) => {
    var err = new Error();

    try {

        const facultades = await pool.query("SELECT *FROM facultad");

        res.status(200).json({ "message": facultades.rows });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }
}

FacultadCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const fac_codigo = req.params.id;

        const facultad = await pool.query("SELECT *FROM facultad WHERE fac_codigo=$1", [fac_codigo]);

        const resultado = facultad.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

FacultadCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { fac_nombre, fac_mision, fac_vision, fac_abreviatura, uni_codigo } = req.body;

        await pool.query("INSERT INTO facultad (fac_nombre, fac_mision, fac_vision, fac_abreviatura, uni_codigo)"
            + " values($1,$2,$3,$4,$5)", [fac_nombre, fac_mision, fac_vision, fac_abreviatura, uni_codigo]);

        res.status(200).json({ "message": "Facultad Agregada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

FacultadCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { fac_codigo, fac_nombre, fac_mision, fac_vision, fac_abreviatura, uni_codigo } = req.body;

        await pool.query("UPDATE facultad SET fac_nombre=$2, fac_mision=$3, fac_vision=$4, fac_abreviatura=$5, uni_codigo=$6"
            + " WHERE fac_codigo=$1", [fac_codigo, fac_nombre, fac_mision, fac_vision, fac_abreviatura, uni_codigo]);

        res.status(200).json({ "message": "Facultad Editada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

FacultadCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { fac_codigo } = req.body;

        await pool.query("DELETE FROM facultad WHERE fac_codigo=$1", [fac_codigo]);

        res.status(200).json({ "message": "Facultad Eliminada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


module.exports = FacultadCtrl;

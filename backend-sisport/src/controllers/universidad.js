
const pool = require("../database/postgresql")

const UniversidadCtrl = {};


UniversidadCtrl.all = async (req, res, next) => {

    var err = new Error();

    try {

        const universidades = await pool.query("SELECT *FROM universidad");

        res.status(200).json({ "message": universidades.rows });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

UniversidadCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { uni_nombre, uni_mision, uni_vision, uni_abreviatura } = req.body;

        const maximo = await pool.query("SELECT MAX(uni_codigo) from universidad");

        const uni_codigo = parseInt(maximo.rows[0].max) + 1;

        await pool.query("INSERT INTO universidad values($1,$2,$3,$4,$5)", [uni_codigo, uni_nombre, uni_mision, uni_vision, uni_abreviatura]);

        res.status(200).json({ "message": "Universidad agregada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


UniversidadCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { uni_codigo, uni_nombre, uni_mision, uni_vision, uni_abreviatura } = req.body;

        await pool.query("UPDATE universidad SET uni_nombre=$2, uni_mision=$3, uni_vision=$4, uni_abreviatura=$5"
            + " WHERE uni_codigo=$1", [uni_codigo, uni_nombre, uni_mision, uni_vision, uni_abreviatura]);

        res.status(200).json({ "message": "Universidad Editada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


UniversidadCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { uni_codigo } = req.body;

        await pool.query("DELETE FROM universidad WHERE uni_codigo=$1", [uni_codigo]);

        res.status(200).json({ "message": "Universidad Eliminada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}



module.exports = UniversidadCtrl;
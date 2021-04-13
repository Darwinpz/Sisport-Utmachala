
const pool = require("../database/postgresql")
const jwt = require("jsonwebtoken")
const UniversidadCtrl = {};

/*
    * Retorna todos los registros de las Universidades
*/
UniversidadCtrl.all = async (req, res, next) => {

    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                
                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const universidades = await pool.query("SELECT *FROM universidad");

                res.status(200).json({ "message": universidades.rows });

            }

        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Retorna un solo resultado de los registros de las Universidades
*/
UniversidadCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const uni_codigo = req.params.id;

        const universidad = await pool.query("SELECT *FROM universidad WHERE uni_codigo=$1", [uni_codigo]);

        const resultado = universidad.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Inserta a la BD una Universidad
*/
UniversidadCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { uni_nombre, uni_mision, uni_vision, uni_abreviatura } = req.body;

        await pool.query("INSERT INTO universidad (uni_nombre, uni_mision, uni_vision, uni_abreviatura)"
            + " values($1,$2,$3,$4)", [uni_nombre, uni_mision, uni_vision, uni_abreviatura]);

        res.status(200).json({ "message": "Universidad Agregada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Edita una Universidad de la BD
*/
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

/*
    * Borra una Universidad de la BD
*/
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
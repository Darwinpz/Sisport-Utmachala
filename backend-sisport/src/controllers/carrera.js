const pool = require("../database/postgresql")

const CarreraCtrl = {};


CarreraCtrl.all = async (req, res, next) => {
    var err = new Error();

    try {

        const carreras = await pool.query("SELECT *FROM carrera");

        res.status(200).json({ "message": carreras.rows });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }
}

CarreraCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { car_nombre, car_mision, car_vision, car_abreviatura, fac_codigo } = req.body;

        await pool.query("INSERT INTO carrera (car_nombre, car_mision, car_vision, car_abreviatura, fac_codigo)"+
                        " values($1,$2,$3,$4,$5)", [car_nombre, car_mision, car_vision, car_abreviatura, fac_codigo ]);

        res.status(200).json({ "message": "Carrera agregada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

CarreraCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { car_codigo, car_nombre, car_mision, car_vision, car_abreviatura, fac_codigo } = req.body;

        await pool.query("UPDATE carrera SET car_nombre=$2, car_mision=$3, car_vision=$4, car_abreviatura=$5, fac_codigo=$6"
            + " WHERE car_codigo=$1", [car_codigo, car_nombre, car_mision, car_vision, car_abreviatura, fac_codigo]);

        res.status(200).json({ "message": "Carrera Editada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

CarreraCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { car_codigo } = req.body;

        await pool.query("DELETE FROM carrera WHERE car_codigo=$1", [car_codigo]);

        res.status(200).json({ "message": "Carrera Eliminada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


module.exports = CarreraCtrl;

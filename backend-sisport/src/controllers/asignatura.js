const pool = require("../database/postgresql")

const AsignaturaCtrl = {};

/*
    * Retorna todos los registros de la Asignatura
*/
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

/*
    * Retorna un solo resultado de los registros de la Asignatura
*/
AsignaturaCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const asig_codigo = req.params;

        const asignatura = await pool.query("SELECT *FROM asignatura WHERE asig_codigo=$1", [asig_codigo]);

        const resultado = asignatura.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Retorna resultados de las Asignaturas
*/
AsignaturaCtrl.buscar = async (req, res, next) => {

    var err = new Error();

    try {

        const { car_nombre } = req.body;

        const asignaturas = await pool.query("SELECT *FROM asignatura as asig,semestre as sem,carrera as car WHERE asig.sem_codigo = sem.sem_codigo and sem.car_codigo = car.car_codigo and car.car_nombre=$1", [car_nombre]);

        const resultado = asignaturas.rows;

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}


/*
    * Inserta a la BD una Asignatura
*/
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

/*
    * Edita una Asignatura de la BD
*/
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

/*
    * Borra una Asignatura de la BD
*/
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
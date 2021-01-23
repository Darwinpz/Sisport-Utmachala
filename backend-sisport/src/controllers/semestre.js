const pool = require("../database/postgresql")

const SemestreCtrl = {};

/*
    * Retorna todos los registros de los Semestres
*/
SemestreCtrl.all = async (req, res, next) => {
    var err = new Error();

    try {

        const semestres = await pool.query("SELECT *FROM semestre");

        res.status(200).json({ "message": semestres.rows });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }
}

/*
    * Retorna un solo resultado de los registros de los Semestres
*/
SemestreCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const sem_codigo = req.params.id;

        const semestre = await pool.query("SELECT *FROM semestre WHERE sem_codigo=$1", [sem_codigo]);

        const resultado = semestre.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Inserta a la BD un Semestre
*/
SemestreCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { sem_nombre, sem_paralelo, car_codigo } = req.body;

        await pool.query("INSERT INTO semestre (sem_nombre, sem_paralelo, car_codigo)" +
            " values($1,$2,$3)", [sem_nombre, sem_paralelo, car_codigo]);

        res.status(200).json({ "message": "Semestre agregada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Edita un Semestre de la BD
*/
SemestreCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { sem_codigo, sem_nombre, sem_paralelo, car_codigo } = req.body;

        await pool.query("UPDATE semestre SET sem_nombre=$2, sem_paralelo=$3, car_codigo=$4"
            + " WHERE sem_codigo=$1", [sem_codigo, sem_nombre, sem_paralelo, car_codigo]);

        res.status(200).json({ "message": "Semestre Editada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Borra un Semestre de la BD
*/
SemestreCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { sem_codigo } = req.body;

        await pool.query("DELETE FROM semestre WHERE sem_codigo=$1", [sem_codigo]);

        res.status(200).json({ "message": "Semestre Eliminada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


module.exports = SemestreCtrl;

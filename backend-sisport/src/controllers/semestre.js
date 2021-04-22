const pool = require("../database/postgresql")

const SemestreCtrl = {};

/*
    * Retorna todos los registros de los Semestres
*/
SemestreCtrl.all = async (req, res, next) => {
    var err = new Error();

    try {

        const semestres = await pool.query("SELECT sem.sem_codigo, sem.sem_nombre, sem.sem_paralelo, car.car_nombre,fac.fac_nombre, peri.peri_nombre, peri.peri_fecha_inicial, peri.peri_fecha_final, peri.peri_estado"
        +" FROM semestre as sem, carrera as car, facultad as fac, periodo_semestre as peri_sem, periodo as peri where sem.car_codigo = car.car_codigo and fac.fac_codigo = car.fac_codigo and sem.sem_codigo = peri_sem.sem_codigo and peri.peri_codigo = peri_sem.peri_codigo");


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

        await pool.query("INSERT INTO public.semestre (sem_nombre, sem_paralelo, car_codigo)" +
            " values($1,$2,$3)", [sem_nombre, sem_paralelo, car_codigo]);

        var max = await pool.query("SELECT MAX(sem_codigo) FROM semestre", []);

        res.status(200).json({ "message": max.rows[0].max });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}



/*
    * Inserta a la BD un Semestre_periodo
*/
SemestreCtrl.addsemestre_periodo = async (req, res, next) => {

    var err = new Error();

    try {

        const { sem_codigo, peri_codigo } = req.body;

        await pool.query("INSERT INTO public.periodo_semestre (sem_codigo, peri_codigo)" +
            " values($1,$2)", [sem_codigo, peri_codigo]);

        res.status(200).json({ "message": "periodo_semestre agregada" });


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

const pool = require("../database/postgresql")
const jwt = require("jsonwebtoken")
const SemestreCtrl = {};

/*
    * Retorna todos los registros de los Semestres
*/
SemestreCtrl.all = async (req, res, next) => {
    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const semestres = await pool.query("SELECT sem.sem_codigo, sem.sem_nombre, sem.sem_paralelo, car.car_nombre,fac.fac_nombre,peri_sem.peri_codigo, peri.peri_nombre, peri.peri_fecha_inicial, peri.peri_fecha_final, peri.peri_estado"
                    + " FROM semestre as sem, carrera as car, persona_carrera as per_car, facultad as fac, periodo_semestre as peri_sem, periodo as peri where sem.car_codigo = car.car_codigo and fac.fac_codigo = car.fac_codigo and sem.sem_codigo = peri_sem.sem_codigo and peri.peri_codigo = peri_sem.peri_codigo and per_car.car_codigo=car.car_codigo and per_car.per_codigo=$1", [per_codigo]);


                res.status(200).json({ "message": semestres.rows });

            }
        })

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

        const { sem_codigo, peri_codigo } = req.body;

        const semestre = await pool.query("SELECT *FROM semestre as sem, periodo_semestre as peri_sem, carrera as car, facultad as fac"
        +" WHERE sem.car_codigo = car.car_codigo and peri_sem.sem_codigo = sem.sem_codigo and car.fac_codigo = fac.fac_codigo and sem.sem_codigo=$1 and peri_sem.peri_codigo=$2", [sem_codigo, peri_codigo]);

        const resultado = semestre.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        console.log(err.message )
        err.status = 500;
        next(err);

    }

}


/*
    * Retorna un solo resultado de los registros de los Semestres
*/
SemestreCtrl.findPeriodoCarrera = async (req, res, next) => {

    var err = new Error();

    try {

        const { peri_codigo, car_codigo } = req.body;

        const semestre = await pool.query("SELECT sem.sem_nombre, sem.sem_paralelo, sem.sem_codigo FROM semestre as sem, carrera as car,periodo_semestre as peri_sem, periodo as peri, facultad as fac WHERE"
            + " sem.car_codigo = car.car_codigo and car.fac_codigo = fac.fac_codigo and peri_sem.sem_codigo = sem.sem_codigo and peri_sem.peri_codigo = peri.peri_codigo and peri.peri_codigo=$1 and car.car_codigo=$2", [peri_codigo, car_codigo]);

        const resultado = semestre.rows;

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}


/*
    * Retorna los resultado de los registros de los Semestres por paralelos
*/
SemestreCtrl.findparalelos = async (req, res, next) => {

    var err = new Error();

    try {

        const { sem_nombre, car_codigo, peri_codigo } = req.body;

        const semestre = await pool.query("SELECT sem.sem_nombre, sem.sem_paralelo, sem.sem_codigo FROM semestre as sem,periodo_semestre as per_sem, carrera as car  WHERE"
            + " sem.car_codigo = car.car_codigo and per_sem.sem_codigo = sem.sem_codigo and per_sem.peri_codigo =$1 and sem.sem_nombre=$2 and car.car_codigo=$3", [peri_codigo, sem_nombre, car_codigo]);

        const resultado = semestre.rows;

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

        const { sem_codigo, peri_codigo } = req.body;

        const asignaturas = await pool.query("SELECT * FROM semestre as sem, asignatura as asig where sem.sem_codigo = asig.sem_codigo and sem.sem_codigo=$1", [sem_codigo])

        if (asignaturas.rowCount > 0) {

            res.status(400).json({ "message": "No se puede eliminar el semestre" });

        } else {

            await pool.query("BEGIN")
            await pool.query("DELETE FROM periodo_semestre WHERE sem_codigo=$1 and peri_codigo=$2", [sem_codigo, peri_codigo]);
            await pool.query("DELETE FROM semestre WHERE sem_codigo=$1", [sem_codigo]);
            await pool.query("COMMIT")

            res.status(200).json({ "message": "Semestre Eliminado" });

        }


    } catch (e) {

        await pool.query("ROLLBACK")

        err.message = e.message;
        console.log(err.message)
        err.status = 500;
        next(err);

    }


}


module.exports = SemestreCtrl;

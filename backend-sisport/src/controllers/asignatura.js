const pool = require("../database/postgresql")
const jwt = require("jsonwebtoken")
const AsignaturaCtrl = {};

/*
    * Retorna todos los registros de la Asignatura
*/
AsignaturaCtrl.all = async (req, res, next) => {

    var err = new Error();

    try {

        const asignaturas = await pool.query("SELECT *FROM asignatura as asig, semestre as sem, carrera as car, facultad as fac, periodo_semestre as peri_sem, periodo as peri"
            + " where asig.sem_codigo = sem.sem_codigo and sem.car_codigo = car.car_codigo and fac.fac_codigo = car.fac_codigo and sem.sem_codigo = peri_sem.sem_codigo and peri.peri_codigo = peri_sem.peri_codigo");

        res.status(200).json({ "message": asignaturas.rows });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}



/*
    * Retorna todos los registros de la Asignatura
*/
AsignaturaCtrl.allcoordinador = async (req, res, next) => {

    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const asignaturas = await pool.query("SELECT *FROM asignatura as asig, semestre as sem, carrera as car, persona_carrera as per_car, facultad as fac, periodo_semestre as peri_sem, periodo as peri"
                    + " where asig.sem_codigo = sem.sem_codigo and sem.car_codigo = car.car_codigo and fac.fac_codigo = car.fac_codigo and sem.sem_codigo = peri_sem.sem_codigo and peri.peri_codigo = peri_sem.peri_codigo and per_car.car_codigo=car.car_codigo and per_car.per_codigo=$1", [per_codigo]);

                res.status(200).json({ "message": asignaturas.rows });

            }
        })


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

        const { asig_codigo } = req.body;

        const asignatura = await pool.query("SELECT fac.fac_codigo, sem.sem_codigo, peri.peri_codigo, car.car_codigo, asig.asig_nombre, asig.asig_identificador, per.per_codigo as docente"
            + " FROM asignatura as asig, semestre as sem, carrera as car, facultad as fac, periodo_semestre as peri_sem, periodo as peri, vi_docente_asignaturas as vi, persona as per"
            + " where asig.sem_codigo = sem.sem_codigo and vi.asig_codigo = asig.asig_codigo and vi.peri_codigo = peri.peri_codigo and per.per_codigo = vi.per_codigo and sem.car_codigo = car.car_codigo and fac.fac_codigo = car.fac_codigo and sem.sem_codigo = peri_sem.sem_codigo and peri.peri_codigo = peri_sem.peri_codigo and asig.asig_codigo=$1", [asig_codigo]);

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



        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo
                const { car_nombre } = req.body;

                const activados = await pool.query("SELECT *from asignatura_estado")

                const asignaturas = await pool.query("SELECT asig.asig_codigo, asig.asig_nombre,sem.sem_codigo, sem.sem_nombre, sem.sem_paralelo, peri.peri_codigo, peri.peri_estado, peri.peri_nombre, (per.per_titulo ||' '|| per.per_nombre || ' ' || per.per_apellido) as docente, car.car_abreviatura, asig.asig_identificador, fac.fac_abreviatura,"
                    + " CASE WHEN (select bool(est_asig.asig_codigo) from persona_asignatura as est_asig where est_asig.per_codigo=$1 and est_asig.asig_codigo = asig.asig_codigo) THEN true ELSE false END AS matriculado"
                    + " FROM asignatura as asig,semestre as sem,carrera as car, vi_docente_asignaturas as vi, persona as per, periodo as peri, facultad as fac"
                    + " WHERE asig.sem_codigo = sem.sem_codigo and vi.asig_codigo = asig.asig_codigo and vi.peri_codigo = peri.peri_codigo and per.per_codigo = vi.per_codigo"
                    + " and sem.car_codigo = car.car_codigo and car.fac_codigo = fac.fac_codigo and car.car_nombre=$2", [per_codigo, car_nombre]);

                asignaturas.rows.forEach(asignatura => {

                    const temp = activados.rows.filter(activado => activado.asig_est_asig_codigo == asignatura.asig_codigo && activado.asig_est_peri_codigo == asignatura.peri_codigo && activado.asig_est_estado == true)

                    if (temp.length > 0) {

                        asignatura["estado"] = true;

                    } else {

                        asignatura["estado"] = false;

                    }

                });

                const resultado = asignaturas.rows.filter(asignatura => asignatura.peri_estado == "ACTIVO");


                resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

            }
        })


    } catch (e) {
        console.log(e.message)
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

        const { asig_nombre, sem_codigo, asig_identificador } = req.body;

        await pool.query("BEGIN")
        await pool.query("INSERT INTO public.asignatura (asig_nombre, sem_codigo, asig_identificador) values($1,$2,$3)", [asig_nombre, sem_codigo, asig_identificador]);

        var max = await pool.query("SELECT MAX(asig_codigo) FROM public.asignatura");

        await pool.query("COMMIT")

        res.status(200).json({ "message": max.rows[0].max });


    } catch (e) {
        await pool.query("ROLLBACK")
        err.message = e.message;

        err.status = 500;
        next(err);

    }


}




/*
    * Inserta el estado de la asignatura a la bd
*/
AsignaturaCtrl.addestado = async (req, res, next) => {

    var err = new Error();

    try {

        const { asig_est_asig_codigo, asig_est_peri_codigo, asig_est_estado } = req.body;

        await pool.query("BEGIN")
        await pool.query("INSERT INTO asignatura_estado (asig_est_asig_codigo, asig_est_peri_codigo, asig_est_estado) values($1,$2,$3)", [asig_est_asig_codigo, asig_est_peri_codigo, asig_est_estado]);
        await pool.query("COMMIT")
        res.status(200).json({ "message": "Estado de asignatura Agregada" });


    } catch (e) {
        await pool.query("ROLLBACK")
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

        const { asig_codigo, peri_codigo, asig_identificador, asig_nombre, sem_codigo, cod_docente } = req.body;

        const data = await pool.query("SELECT vi.per_codigo FROM persona_asignatura as per_asig,vi_docente_asignaturas as vi where per_asig.per_codigo = vi.per_codigo and per_asig.asig_codigo=$1 ", [asig_codigo]);

        var docente_anterior = data.rows[0].per_codigo

        const estado = await pool.query("SELECT asig_est_estado FROM asignatura_estado where asig_est_asig_codigo=$1 and asig_est_peri_codigo=$2", [asig_codigo, peri_codigo])

        if (estado.rows[0].asig_est_estado) {

            res.status(400).json({ "message": "La asignatura está activada y no puede ser modificada" });

        } else {

            await pool.query("BEGIN")

            if (docente_anterior != cod_docente) {

                await pool.query("UPDATE persona_asignatura SET per_codigo=$2 WHERE asig_codigo=$1 and per_codigo=$3", [asig_codigo, cod_docente, docente_anterior]);

            }

            await pool.query("UPDATE asignatura SET asig_nombre=$2, asig_identificador=$3, sem_codigo=$4 WHERE asig_codigo=$1", [asig_codigo, asig_nombre, asig_identificador, sem_codigo]);


            await pool.query("COMMIT")


            res.status(200).json({ "message": "Asignatura Editada" });

        }


    } catch (e) {

        await pool.query("ROLLBACK")
        err.message = e.message;
        console.log(err)
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


        const personas = await pool.query("SELECT FROM persona_asignatura WHERE asig_codigo=$1", [asig_codigo]);

        if (personas.rowCount > 1) {

            res.status(400).json({ "message": "Las asignatura tiene estudiantes" });

        } else {

            await pool.query("BEGIN")
            await pool.query("DELETE FROM persona_asignatura WHERE asig_codigo=$1", [asig_codigo]);
            await pool.query("DELETE FROM horario WHERE asig_codigo=$1", [asig_codigo]);
            await pool.query("DELETE FROM asignatura_estado WHERE asig_est_asig_codigo=$1", [asig_codigo]);
            await pool.query("DELETE FROM asignatura WHERE asig_codigo=$1", [asig_codigo]);
            await pool.query("COMMIT")
            res.status(200).json({ "message": "Asignatura Eliminada" });

        }


    } catch (e) {
        console.log(e.message)
        await pool.query("ROLLBACK")

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

module.exports = AsignaturaCtrl;
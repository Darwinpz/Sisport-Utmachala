const pool = require("../database/postgresql")
const jwt = require("jsonwebtoken")
const PerAsigCtrl = {};


/*
    * Retorna todos los registros de las Personas_Asignaturas
*/
PerAsigCtrl.all = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo


                const periodos = await pool.query("SELECT * FROM periodo order by peri_nombre")

                //const personas_asignaturas = await pool.query("SELECT *FROM persona_asignatura as per_as, asignatura as asig, semestre as sem where per_as.asig_codigo = asig.asig_codigo and sem.sem_codigo = asig.sem_codigo and per_as.per_codigo = $1 ", [per_codigo]);

                const personas_asignaturas = await pool.query("SELECT asig.asig_codigo, asig.asig_nombre, asig.asig_identificador, (per.per_titulo ||' '|| per.per_nombre || ' ' || per.per_apellido) as docente, sem.sem_codigo, sem.sem_nombre, sem.sem_paralelo, peri.peri_codigo, asig_estado.asig_est_estado,  fac.fac_abreviatura, car.car_abreviatura"
                    + " FROM persona_asignatura as per_as, asignatura as asig, semestre as sem , vi_docente_asignaturas as vi, persona as per, periodo as peri, asignatura_estado as asig_estado, carrera as car, facultad as fac"
                    + " where per_as.asig_codigo = asig.asig_codigo and sem.sem_codigo = asig.sem_codigo and vi.asig_codigo = asig.asig_codigo and peri.peri_codigo =vi.peri_codigo and car.car_codigo = sem.car_codigo and fac.fac_codigo = car.fac_codigo"
                    +" and asig_estado.asig_est_peri_codigo = peri.peri_codigo and  asig.asig_codigo=asig_estado.asig_est_asig_codigo  and per.per_codigo = vi.per_codigo and per_as.per_codigo = $1 ", [per_codigo]);

                var arreglo = []

                periodos.rows.forEach(periodo => {

                    obj = { "periodo": periodo.peri_nombre, "asignaturas": null }

                    asignaturas = personas_asignaturas.rows.filter(asignatura => asignatura.peri_codigo == periodo.peri_codigo && periodo.peri_estado == "ACTIVO")

                    if(asignaturas.length > 0){

                        obj.asignaturas = asignaturas

                        arreglo.push(obj)

                    }


                });

                
                res.status(200).json({ "message": arreglo });

            }
        })


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Retorna alumnos matriculados por asignatura y periodo
*/
PerAsigCtrl.matriculadosxasignaturas = async (req, res, next) => {

    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const { asig_codigo, peri_codigo,sem_codigo } = req.body;

                const persona_asignaturas = await pool.query("SELECT per.per_codigo, per.per_nombre, per.per_apellido FROM persona_asignatura as per_asig, persona as per, periodo_semestre as per_sem WHERE "
                    + " per.per_codigo = per_asig.per_codigo and per.per_tipo = 'ESTUDIANTE' and per_sem.peri_codigo = per_asig.peri_codigo and per_asig.asig_codigo=$1 and per_asig.peri_codigo=$2 and per_sem.sem_codigo=$3 ", [asig_codigo, peri_codigo, sem_codigo]);

                const resultado = persona_asignaturas.rows;

                resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });
            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}


/*
    * Retorna un solo resultado de los registros de las Personas_Asignaturas
*/
PerAsigCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const perasig_codigo = req.params.id;

        const persona_asignatura = await pool.query("SELECT *FROM persona_asignatura WHERE perasig_codigo=$1", [perasig_codigo]);

        const resultado = persona_asignatura.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Inserta a la BD las Personas_Asignaturas
*/
PerAsigCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {


                const { per_codigo, asig_codigo, peri_codigo } = req.body;
                await pool.query("BEGIN")
                await pool.query("INSERT INTO public.persona_asignatura (per_codigo, asig_codigo, peri_codigo) values($1,$2,$3)", [per_codigo, asig_codigo, peri_codigo]);

                res.status(200).json({ "message": "Persona_Asignatura Agregada" });
                await pool.query("COMMIT")

            }
        })

    } catch (e) {
        await pool.query("ROLLBACK")
        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Edita las Personas_Asignaturas de la BD
*/
PerAsigCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { perasig_codigo, per_codigo, asig_codigo, peri_codigo } = req.body;

        await pool.query("UPDATE persona_asignatura SET per_codigo=$2, asig_codigo=$3 peri_codigo=$4 WHERE perasig_codigo=$1",
            [perasig_codigo, per_codigo, asig_codigo, peri_codigo]);

        res.status(200).json({ "message": "Persona_Asignatura Editada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Borra las Personas_Asignaturas de la BD
*/
PerAsigCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { asig_codigo } = req.body;

        await pool.query("DELETE FROM persona_asignatura WHERE asig_codig=$1", [asig_codigo]);

        res.status(200).json({ "message": "Persona_Asignatura Eliminada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

module.exports = PerAsigCtrl;
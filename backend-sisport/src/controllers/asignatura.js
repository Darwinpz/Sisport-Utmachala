const pool = require("../database/postgresql")
const jwt = require("jsonwebtoken")
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



        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo
                const { car_nombre } = req.body;

                const activados = await pool.query("SELECT *from asignatura_estado")

                const asignaturas = await pool.query("SELECT asig.asig_codigo, asig.asig_nombre, sem.sem_nombre, sem.sem_paralelo, peri.peri_codigo, peri.peri_nombre, (per.per_titulo ||' '|| per.per_nombre || ' ' || per.per_apellido) as docente, car.car_abreviatura, asig.asig_identificador, fac.fac_abreviatura,"
                    + " CASE WHEN (select bool(est_asig.asig_codigo) from persona_asignatura as est_asig where est_asig.per_codigo=$1 and est_asig.asig_codigo = asig.asig_codigo) THEN true ELSE false END AS matriculado"
                    + " FROM asignatura as asig,semestre as sem,carrera as car, vi_docente_asignaturas as vi, persona as per, periodo as peri, facultad as fac"
                    + " WHERE asig.sem_codigo = sem.sem_codigo and vi.asig_codigo = asig.asig_codigo and vi.peri_codigo = peri.peri_codigo and per.per_codigo = vi.per_codigo and sem.car_codigo = car.car_codigo and car.fac_codigo = fac.fac_codigo and car.car_nombre=$2", [per_codigo, car_nombre]);

                asignaturas.rows.forEach(asignatura => {

                    const temp = activados.rows.filter(activado => activado.asig_est_asig_codigo == asignatura.asig_codigo && activado.asig_est_peri_codigo == asignatura.peri_codigo && activado.asig_est_estado == true)

                    if(temp.length > 0){
                        
                        asignatura["estado"] = true;

                    }else{

                        asignatura["estado"] = false;

                    }


                });
                
                const resultado = asignaturas.rows;

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
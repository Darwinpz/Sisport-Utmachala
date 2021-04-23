const pool = require("../database/postgresql")
const jwt = require("jsonwebtoken")
const FacultadCtrl = {};

/*
    * Retorna todos los registros de la Facultad
*/
FacultadCtrl.all = async (req, res, next) => {

    var err = new Error();


    try {

        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const carrera_persona = await pool.query("SELECT fac.fac_codigo, fac.fac_nombre FROM persona_carrera as per_car, carrera as car, facultad as fac"
                +" where per_car.car_codigo = car.car_codigo and car.fac_codigo = fac.fac_codigo and per_car.per_codigo =$1 ",[per_codigo]);

                var temp = carrera_persona.rows[0]

                var facultades = [];

                facultades.push(temp)
    
                carrera_persona.rows.forEach(carrera => {

                    if(temp.fac_codigo != carrera.fac_codigo){

                        facultades.push(carrera)
                        
                        temp = carrera

                    }

                });

                res.status(200).json({ "message": facultades });

                
            }
        })
       

    } catch (e) {

        err.message = e.message;
        console.log(err.message)
        err.status = 500;
        next(err);

    }
}

/*
    * Retorna un solo resultado de los registros de la Facultad
*/
FacultadCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const fac_codigo = req.params.id;

        const facultad = await pool.query("SELECT *FROM facultad WHERE fac_codigo=$1", [fac_codigo]);

        const resultado = facultad.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Inserta a la BD una Facultad
*/
FacultadCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { fac_nombre, fac_mision, fac_vision, fac_abreviatura, uni_codigo } = req.body;

        await pool.query("INSERT INTO facultad (fac_nombre, fac_mision, fac_vision, fac_abreviatura, uni_codigo)"
            + " values($1,$2,$3,$4,$5)", [fac_nombre, fac_mision, fac_vision, fac_abreviatura, uni_codigo]);

        res.status(200).json({ "message": "Facultad Agregada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Edita una Facultad de la BD
*/
FacultadCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { fac_codigo, fac_nombre, fac_mision, fac_vision, fac_abreviatura, uni_codigo } = req.body;

        await pool.query("UPDATE facultad SET fac_nombre=$2, fac_mision=$3, fac_vision=$4, fac_abreviatura=$5, uni_codigo=$6"
            + " WHERE fac_codigo=$1", [fac_codigo, fac_nombre, fac_mision, fac_vision, fac_abreviatura, uni_codigo]);

        res.status(200).json({ "message": "Facultad Editada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Borra una Facultad de la BD
*/
FacultadCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { fac_codigo } = req.body;

        await pool.query("DELETE FROM facultad WHERE fac_codigo=$1", [fac_codigo]);

        res.status(200).json({ "message": "Facultad Eliminada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


module.exports = FacultadCtrl;

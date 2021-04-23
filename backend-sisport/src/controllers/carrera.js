const pool = require("../database/postgresql")
const jwt = require("jsonwebtoken")
const CarreraCtrl = {};

/*
    * Retorna todos los registros de la Carrera
*/
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


/*
    * Retorna todas las Carreras y su facultad respectiva
*/
CarreraCtrl.allxfacultad = async (req, res, next) => {

    var err = new Error();

    try {

        const facultades = await pool.query("SELECT fac_codigo,fac_nombre FROM facultad order by fac_nombre");

        const carreras = await pool.query("SELECT car.car_codigo, car.car_nombre, fac.fac_nombre, fac.fac_codigo FROM carrera as car, facultad as fac where car.fac_codigo = fac.fac_codigo order by fac.fac_nombre");

        var arreglo = []

        facultades.rows.forEach(facultad => {
            
            obj = {"facultad":facultad.fac_nombre,"fac_id":facultad.fac_codigo,"carreras":null}

            var data = carreras.rows.filter(carrera => carrera.fac_codigo == facultad.fac_codigo)

            obj.carreras = data

            arreglo.push(obj)

        });
        
        res.status(200).json({ "message": arreglo });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}


/*
    * Retorna un solo resultado de los registros de la Carrera
*/
CarreraCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const car_codigo = req.params.id;

        const carrera = await pool.query("SELECT *FROM carrera WHERE car_codigo=$1", [car_codigo]);

        const resultado = carrera.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}


/*
    * Retorna un solo resultado de los registros de la Carrera por facultad
*/
CarreraCtrl.findfacultad = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const {fac_codigo} = req.body;

                const carrera = await pool.query("SELECT car.car_codigo, car.car_nombre FROM carrera as car, persona_carrera as per_car, facultad as fac WHERE car.fac_codigo = fac.fac_codigo and per_car.car_codigo = car.car_codigo and fac.fac_codigo=$1 and per_car.per_codigo=$2", [fac_codigo, per_codigo]);
        
                const resultado = carrera.rows;
        
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
    * Inserta a la BD una Carrera
*/
CarreraCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { car_nombre, car_mision, car_vision, car_abreviatura, fac_codigo } = req.body;

        await pool.query("INSERT INTO carrera (car_nombre, car_mision, car_vision, car_abreviatura, fac_codigo)" +
            " values($1,$2,$3,$4,$5)", [car_nombre, car_mision, car_vision, car_abreviatura, fac_codigo]);

        res.status(200).json({ "message": "Carrera Agregada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Edita una Carrera de la BD
*/
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

/*
    * Borra una Carrera de la BD
*/
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

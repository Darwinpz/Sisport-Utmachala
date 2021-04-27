const pool = require("../database/postgresql")
const jwt = require("jsonwebtoken")
const PersonaCtrl = {};

/*
    * Retorna todos los registros de las Personas o Usuarios
*/
PersonaCtrl.all = async (req, res, next) => {

    var err = new Error();

    try {

        const personas = await pool.query("SELECT *FROM persona");

        res.status(200).json({ "message": personas.rows });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Retorna todos los registros de las Personas o Usuarios por ROL
*/
PersonaCtrl.all_rol = async (req, res, next) => {

    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const { rol } = req.body;

                var personas = []
                
                if(rol == "DOCENTE"){

                    personas = await pool.query("SELECT per_codigo,per_tipo, per_cedula, per_titulo, per_nombre, per_apellido, per_correo FROM persona where per_tipo=$1  or per_tipo='COORDINADOR'", [rol]);

                }else{

                    personas = await pool.query("SELECT per_codigo,per_tipo, per_cedula, per_titulo, per_nombre, per_apellido, per_correo FROM persona where per_tipo=$1", [rol]);

                }
                
                res.status(200).json({ "message": personas.rows });

            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Retorna El usuario actual
*/
PersonaCtrl.login = async (req, res, next) => {

    var err = new Error();

    try {

        const { per_cedula, per_clave } = req.body;

        const persona = await pool.query("SELECT per_codigo,per_cedula, per_titulo, per_nombre, per_apellido, per_tipo, per_correo FROM persona where per_cedula=$1 and per_clave=$2", [per_cedula, per_clave]);

        if (persona.rowCount > 0) {

            const token = jwt.sign({ usuario: persona.rows[0] }, process.env.jwtcode, { expiresIn: "1h" });

            res.status(200).json({ "token": token });

        } else {

            res.status(403).json({ "message": 'Error al iniciar sesión' });

        }


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


/*
    * Retorna un solo resultado de los registros de las Personas o Usuarios
*/
PersonaCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const {per_codigo} = req.body;

        const persona = await pool.query("SELECT *FROM persona WHERE per_codigo=$1", [per_codigo]);

        const resultado = persona.rows[0];

        resultado ? res.status(200).json({ "message": resultado }) : res.status(200).json({ "message": {} });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

/*
    * Retorna el perfil del usuario conectado
*/
PersonaCtrl.perfil = async (req, res, next) => {

    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const persona = await pool.query("SELECT per_codigo,per_cedula, per_nombre, per_apellido, per_correo, per_direccion, per_titulo, per_telef_celular, per_sexo, per_tipo FROM persona WHERE per_codigo=$1", [per_codigo]);

                const resultado = persona.rows[0];

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
    * Inserta a la BD una Persona o Usuario
*/
PersonaCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento,
            per_edad, per_correo, per_facebook, per_direccion, per_pais, per_provincia, per_ciudad,
            per_sexo, per_estado_civil, per_telef_fijo, per_telef_celular } = req.body;

            console.log(req.body)

        await pool.query("INSERT INTO persona (per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento,"
            + " per_edad, per_correo, per_facebook, per_direccion, per_pais, per_provincia, per_ciudad, per_sexo, per_estado_civil,"
            + " per_telef_fijo, per_telef_celular, per_clave)"
            + " values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)", [per_cedula, per_nombre,
            per_apellido, per_tipo, per_titulo, per_fecha_nacimiento, per_edad, per_correo, per_facebook, per_direccion, per_pais,
            per_provincia, per_ciudad, per_sexo, per_estado_civil, per_telef_fijo, per_telef_celular, per_cedula]);

        res.status(200).json({ "message": "Persona Agregada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Edita una Persona o Usuario de la BD
*/
PersonaCtrl.put = async (req, res, next) => {

    var err = new Error();

    try {

        const { per_codigo, per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento, per_correo,
            per_facebook, per_direccion, per_pais, per_provincia, per_ciudad, per_sexo, per_estado_civil, per_telef_fijo,
            per_telef_celular } = req.body;

        await pool.query("UPDATE persona SET per_cedula=$2, per_nombre=$3, per_apellido=$4, per_tipo=$5, per_titulo=$6,"
            + " per_fecha_nacimiento=$7, per_correo=$8, per_facebook=$9, per_direccion=$10, per_pais=$11,"
            + " per_provincia=$12, per_ciudad=$13, per_sexo=$14, per_estado_civil=$15, per_telef_fijo=$16, per_telef_celular=$17"
            + " WHERE per_codigo=$1", [per_codigo, per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento,
            per_correo, per_facebook, per_direccion, per_pais, per_provincia, per_ciudad, per_sexo, per_estado_civil,
            per_telef_fijo, per_telef_celular]);

        res.status(200).json({ "message": "Persona Editada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

/*
    * Borra una Persona o Usuario de la BD
*/
PersonaCtrl.delete = async (req, res, next) => {

    var err = new Error();

    try {

        const { per_codigo } = req.body;

        await pool.query("DELETE FROM persona WHERE per_codigo=$1", [per_codigo]);

        res.status(200).json({ "message": "Persona Eliminada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}

PersonaCtrl.updatePassword=async(req, res, next)=>{

    var err = new Error();

    try {

        const { per_clave, per_codigo } = req.body;

        await pool.query("UPDATE persona SET per_clave=$1 WHERE per_codigo=$2", [per_clave, per_codigo]);

        res.status(200).json({ "message": "Contraseña editada" });


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

module.exports = PersonaCtrl;
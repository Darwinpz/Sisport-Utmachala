const pool = require("../database/postgresql")

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
    * Retorna El usuario actual
*/
PersonaCtrl.login = async (req, res, next) => {

    var err = new Error();

    try {

        const { per_cedula, per_clave } = req.body;

        const personas = await pool.query("SELECT *FROM persona where per_cedula=$1 and per_clave=$2",[per_cedula,per_clave]);

        res.status(200).json({ "message": personas.rows[0] });


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

        const per_codigo = req.params.id;

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
    * Inserta a la BD una Persona o Usuario
*/
PersonaCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento,
            per_edad, per_correo, per_facebook, per_direccion, per_pais, per_provincia, per_ciudad,
            per_sexo, per_estado_civil, per_telef_fijo, per_telef_celular, per_clave } = req.body;

        await pool.query("INSERT INTO persona (per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento,"
            + " per_edad, per_correo, per_facebook, per_direccion, per_pais, per_provincia, per_ciudad, per_sexo, per_estado_civil,"
            + " per_telef_fijo, per_telef_celular, per_clave)"
            + " values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)", [per_cedula, per_nombre,
            per_apellido, per_tipo, per_titulo, per_fecha_nacimiento, per_edad, per_correo, per_facebook, per_direccion, per_pais,
            per_provincia, per_ciudad, per_sexo, per_estado_civil, per_telef_fijo, per_telef_celular, per_clave]);

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

        const { per_codigo, per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento, per_edad, per_correo,
            per_facebook, per_direccion, per_pais, per_provincia, per_ciudad, per_sexo, per_estado_civil, per_telef_fijo,
            per_telef_celular, per_clave } = req.body;

        await pool.query("UPDATE persona SET per_cedula=$2, per_nombre=$3, per_apellido=$4, per_tipo=$5, per_titulo=$6,"
            + " per_fecha_nacimiento=$7, per_edad=$8, per_correo=$9, per_facebook=$10, per_direccion=$11, per_pais=$12,"
            + " per_provincia=$13, per_ciudad=$14, per_sexo=$15, per_estado_civil=$16, per_telef_fijo=$17, per_telef_celular=$18, per_clave=$19"
            + " WHERE fam_codigo=$1", [per_codigo, per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento,
            per_edad, per_correo, per_facebook, per_direccion, per_pais, per_provincia, per_ciudad, per_sexo, per_estado_civil,
            per_telef_fijo, per_telef_celular, per_clave]);

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

module.exports = PersonaCtrl;
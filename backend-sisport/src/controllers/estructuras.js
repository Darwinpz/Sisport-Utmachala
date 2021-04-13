
const EstructuraSchema = require('../models/estructura')

const EstructuraCtrl = {};

EstructuraCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const {nombre_esquema, asig_codigo, peri_codigo,asig_nombre,syllabus,docente,clave} = req.body;

        const estructura = EstructuraSchema.add(nombre_esquema);

        const estructuraModel = new estructura();

        estructuraModel.generales.cod_asignatura = asig_codigo;
        estructuraModel.generales.periodo = peri_codigo;
        estructuraModel.generales.nombre_asignatura = asig_nombre;
        estructuraModel.generales.syllabus = syllabus;
        estructuraModel.generales.contenidos = [];
        estructuraModel.generales.docente = docente;
        estructuraModel.generales.clave = clave;
        
        await estructuraModel.save();

        res.status(200).json({ "message": "Estructura Creada" });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}



module.exports = EstructuraCtrl;
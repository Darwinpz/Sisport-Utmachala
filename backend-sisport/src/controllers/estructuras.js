
const EstructuraSchema = require('../models/estructura')

const EstructuraCtrl = {};

EstructuraCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const {nombre_esquema, cod_asignatura, periodo,nombre_asignatura,syllabus,contenidos,docente,clave} = req.body;

        const estructura = EstructuraSchema.add(nombre_esquema);

        const estructuraModel = new estructura();

        estructuraModel.generales.cod_asignatura = cod_asignatura;
        estructuraModel.generales.periodo = periodo;
        estructuraModel.generales.nombre_asignatura = nombre_asignatura;
        estructuraModel.generales.syllabus = syllabus;
        estructuraModel.generales.contenidos = contenidos;
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
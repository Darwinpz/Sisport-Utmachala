
const EstructuraSchema = require('../models/estructura')

const EstructuraCtrl = {};

EstructuraCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const nombre_esquema = "fic.it";

        const estructura = EstructuraSchema.add(nombre_esquema);

        const estructuraModel = new estructura();

        estructuraModel.generales.cod_asignatura = "ISB123";
        estructuraModel.generales.periodo = 1

        await estructuraModel.save();

        res.status(200).json({ "message": "Estructura Creada" });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


module.exports = EstructuraCtrl;
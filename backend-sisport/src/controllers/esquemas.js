const EsquemaSchema = require('../models/esquema')

const EsquemaCtrl = {};

EsquemaCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const { nombre_esquema } = req.body

        const esquema = EsquemaSchema.add(nombre_esquema);

        const existe = await esquema.findOne() // Verifica si ya existe el esquema

        if (existe) {

            res.status(200).json({ "message": "Esquema Existente" });

        } else {

            const esquemaModel = new esquema();

            await esquemaModel.save();

            res.status(200).json({ "message": "Esquema Creado" });

        }


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


module.exports = EsquemaCtrl;
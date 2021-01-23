
//const PortafolioSchema = require('../models/portafolio')

const PortafolioCtrl = {};

PortafolioCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

       // const portafolio = new PortafolioSchema();

        //portafolio.generales.ruta_syllabus = "/public/syllabus.pdf";

        //await portafolio.save();

        res.status(200).json({ "message": "Portafolio Creado" });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}


module.exports = PortafolioCtrl;
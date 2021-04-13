
//const PortafolioSchema = require('../models/portafolio')

const EstructuraSchema = require('../models/estructura')

const PortafolioCtrl = {};

PortafolioCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        const esquema = EstructuraSchema.add("fic.is.esqs")

        const busqueda = await esquema.findOne({ 'generales.periodo': '1' });

        busqueda.portafolios.push(portafolio())

        await busqueda.save()

        res.status(200).json({ "message": "Portafolio Creado" });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}


PortafolioCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {

        const esquema = EstructuraSchema.add("fic.is.esqs")

        const busqueda = await esquema.find({});

        console.log(busqueda)

        //const portafolio = busqueda.portafolios.filter(portafolio => portafolio.datos_informativos.cod_estudiante == "1")

//        console.log(portafolio)

        res.status(200).json({ "message": "" });

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

function portafolio() {

    const obj = {

        datos_informativos: {

            cod_estudiante: {}
        },

        elementos_curriculares: {

            syllabus: {},
            expectativas: {},
            apuntes: [],
            evaluaciones: [],
            investigaciones: [],
            actividades: [],
            proyectos: [],
            casos_estudio: [],
            planteamientos: [],
            asistencia: {},
            observaciones: [],
            intraclases: [],
            autonomos: [],
            refuerzo: []

        },

        informe_final: {}

    }

    return obj

}


module.exports = PortafolioCtrl;
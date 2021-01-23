const mongoose = require('mongoose');

const { Schema } = mongoose;

const PortafolioSchema = new Schema(

    {

        datos_informativos: {

            cod_estudiante: { type: String }
        },

        elementos_curriculares: {

            syllabus: { type: JSON },
            expectativas: { type: String },
            apuntes: [],
            evaluaciones: [],
            investigaciones: [],
            actividades: [],
            proyectos: [],
            casos_estudio: [],
            planteamientos: [],
            asistencia: { type: JSON },
            observaciones: [],
            intraclases: [],
            autonomos: [],
            refuerzo: []

        },

        informe_final: { type: JSON }

    }

)


module.exports = mongoose.model('Portafolios', PortafolioSchema);
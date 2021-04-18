const mongoose = require('mongoose');

const {Schema} = mongoose;


const AsignaturaSchema =  new Schema(
    
    {

        generales: {
            
            cod_asignatura: {type: String},
            periodo: {type: String},
            nombre_asignatura: {type: String},
            syllabus: {type: String},
            contenidos: [],
            docente: {type: String},
            clave: {type: String}

        },

        portafolios: []

    }

)

module.exports = mongoose.model('Asignaturas', AsignaturaSchema);
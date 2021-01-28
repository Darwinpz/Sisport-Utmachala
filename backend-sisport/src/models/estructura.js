const mongoose = require('mongoose');

const {Schema} = mongoose;

const EstructuraCtrl = {};

EstructuraCtrl.add = (nombre) => {

    const EstructuraSchema =  new Schema(
    
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

    return mongoose.models[nombre] || mongoose.model(nombre, EstructuraSchema); // Evita sobreescribir el modelo ya compilado

}

module.exports = EstructuraCtrl;
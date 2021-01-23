const mongoose = require('mongoose');

const { Schema } = mongoose;


const EsquemaCtrl = {};

/*
    * Modelo tipo función a fin de ser instanciado en otra clase
    * Se crean esquemas de forma dinámica
*/
EsquemaCtrl.add = (nombre) => {

    const EsquemaSchema = new Schema();

    return mongoose.models[nombre] || mongoose.model(nombre, EsquemaSchema); // Evita sobreescribir el modelo ya compilado

}

module.exports = EsquemaCtrl;
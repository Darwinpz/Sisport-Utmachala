

import useScript from "hooks/useScript";
import React from "react";

export default function ModalPeriodo() {


    useScript("/js/picker.js")

    return (

        <div className="modal fade" id="asignaturas" tabIndex="-1" role="dialog" aria-labelledby="asignaturasModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">CREAR ASIGNATURAS</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id="modal-body">

                        <h5>Identificador: </h5>
                        <div className="form-group modal-identificador">
                            <input
                                placeholder="Identificador de la asignatura"
                                className="form-control border-primary"
                                name="asig_identificador"
                                id="asig_identificador"
                            />
                        </div>

                        <h5>Nombre: </h5>
                        <div className="form-group modal-nombre">
                            <input
                                placeholder="Nombre de la asignatura"
                                className="form-control border-primary"
                                name="asig_nombre"
                                id="asig_nombre"
                            />
                        </div>

                        <h5>Facultad: </h5>
                        <div className="form-group modal-facultad">

                            <select className="form-control border-primary" name="fac_codigo" id="fac_codigo" required>
                                <option selected disabled value="">Selecciona la Facultad...</option>
                                <option value="1">FACULTAD DE INGENIERÍA CIVIL</option>
                            </select>

                        </div>

                        <h5>Carrera: </h5>
                        <div className="form-group modal-carrera">

                            <select className="form-control  border-primary" name="car_codigo" id="car_codigo"  required>
                                <option selected disabled value="">Selecciona la Carrera...</option>
                                <option value="1">INGENIERIA DE SISTEMAS</option>
                                <option value="2">INGENIERIA EN TECNOLOGÍAS DE LA INFORMACIÓN</option>
                            </select>

                        </div>

                        <h5>Semestre: </h5>
                        <div className="form-group modal-semestre">

                            <select className="form-control border-primary" name="sem_codigo" id="sem_codigo" required>
                                <option selected disabled value="">Selecciona el semestre...</option>
                                <option value="1">NOVENO SEMESTRE A</option>
                            </select>

                        </div>

                        
                        <h5>Docente: </h5>
                        <div className="form-group modal-semestre">

                            <select className="form-control border-primary" name="docente_codigo" id="docente_codigo" required>
                                <option selected disabled value="">Selecciona el docente...</option>
                                <option value="1">Ing. Joofre</option>
                            </select>

                        </div>

                        
                    </div>

                    <div className="modal-footer" id="footer-asignaturas">

                        <button type="button" className="btn btn-success">Guardar Asignatura</button>

                    </div>

                </div>
            </div>
        </div>

    )


}
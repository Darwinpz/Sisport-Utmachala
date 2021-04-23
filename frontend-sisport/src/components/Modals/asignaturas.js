

import useScript from "hooks/useScript";
import asignaturaService from 'services/asignaturas'
import perasigService from 'services/perasig'

import React, { useState } from "react";

export default function ModalAsignaturas() {


    useScript("/js/asignaturas.js")


    const [error, setError] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { add, add_estado } = asignaturaService({ jwt })

    const { add_perasig } = perasigService({ jwt })

    const handleSubmit = () => {


        const asig_nombre = document.getElementById("asig_nombre").value
        const sem_codigo = document.getElementById("sem_codigo").value
        const asig_identificador = document.getElementById("asig_identificador").value
        const docente_codigo = document.getElementById("docente_codigo").value
        const peri_codigo = document.getElementById("peri_codigo").value

        setError("")

        add({ asig_nombre, sem_codigo, asig_identificador }).then((asig_codigo) => {


            add_perasig({ per_codigo:docente_codigo, asig_codigo, peri_codigo }).then(() => {


                add_estado({ asig_est_asig_codigo:asig_codigo, asig_est_peri_codigo:peri_codigo, asig_est_estado:false }).then(() => {


                    window.location.reload()


                }).catch(() => {

                    setError("Error al activar la asignatura")

                })


            }).catch(() => {

                setError("Error al agregar al docente")

            })


        }).catch(() => {

            setError("Error al guardar la asignatura")
        })



    };

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
                            </select>

                        </div>

                        <h5>Carrera: </h5>
                        <div className="form-group modal-carrera">

                            <select className="form-control  border-primary" name="car_codigo" id="car_codigo" required>
                                <option selected disabled value="">Selecciona la Carrera...</option>
                            </select>

                        </div>

                        <h5>Periodo: </h5>
                        <div className="form-group modal-periodo">

                            <select className="form-control border-primary" name="peri_codigo" id="peri_codigo" required>
                                <option selected disabled value="">Selecciona un Periodo...</option>
                            </select>

                        </div>


                        <h5>Semestre: </h5>
                        <div className="form-group modal-semestre">

                            <select className="form-control border-primary" name="sem_codigo" id="sem_codigo" required>
                                <option selected disabled value="">Selecciona el Semestre...</option>
                            </select>

                        </div>


                        <h5>Docente: </h5>
                        <div className="form-group modal-docente">

                            <select className="form-control border-primary" name="docente_codigo" id="docente_codigo" required>
                                <option selected disabled value="">Selecciona el Docente...</option>
                            </select>

                        </div>


                    </div>

                    <div className="modal-footer" id="footer-asignaturas">
                        {error && <strong>{error}</strong>}
                        <button type="button" className="btn btn-success" onClick={() => handleSubmit()}>Guardar Asignatura</button>

                    </div>

                </div>
            </div>
        </div>

    )


}
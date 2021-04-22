

import useScript from "hooks/useScript";
import React, { useState } from "react";

import periodoService from 'services/periodos'

export default function ModalPeriodo() {

    useScript("/js/periodo.js")
    useScript("/js/picker.js")

    const [error, setError] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { add } = periodoService({ jwt })

    const AddSubmit = () => {

        const peri_nombre = document.getElementById("peri_nombre").value
        const peri_fecha_inicial = document.getElementById("fecha_inicio").value
        const peri_fecha_final = document.getElementById("fecha_fin").value
        const sem_codigo = document.getElementById("sem_codigo").value
        const peri_estado = document.getElementById("peri_estado").value

        setError("")

        add({ peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo, peri_estado }).then(() => {

            window.location.reload()

        }).catch(() => {

            setError("Error al guardar el periodo")
        })

    }

    return (

        <div className="modal fade" id="periodo" tabIndex="-1" role="dialog" aria-labelledby="periodoModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">ASIGNAR PERIODO</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id="modal-body">

                        <h5>Abreviatura: </h5>
                        <div className="form-group modal-nombre">
                            <input
                                placeholder="Nombre del semestre"
                                className="form-control border-primary"
                                name="peri_nombre"
                                id="peri_nombre"
                            />
                        </div>

                        <h5>Fecha de inicio: </h5>
                        <div className="input-group date modal-inicio mb-3" id="datetimepickerInicio" data-target-input="nearest">
                            <input placeholder="ddd/mm/yyyy" className="form-control datetimepicker-input" name="fecha_inicio" id="fecha_inicio" />
                            <div className="input-group-append" data-target="#datetimepickerInicio" data-toggle="datetimepicker">
                                <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                            </div>

                        </div>

                        <h5>Fecha de fin: </h5>
                        <div className="input-group date modal-fin mb-3" id="datetimepickerFin" data-target-input="nearest">
                            <input placeholder="ddd/mm/yyyy" className="form-control datetimepicker-input" name="fecha_fin" id="fecha_fin" />
                            <div className="input-group-append" data-target="#datetimepickerFin" data-toggle="datetimepicker">
                                <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                            </div>

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

                            <select className="form-control  border-primary" name="car_codigo" id="car_codigo" required>
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

                        <h5>Estado: </h5>
                        <div className="form-group modal-estado">

                            <select className="form-control  border-primary" name="peri_estado" id="peri_estado" required>
                                <option selected disabled value="">Selecciona un estado...</option>
                                <option value="ACTIVO">ACTIVO</option>
                                <option value="INACTIVO">INACTIVO</option>
                            </select>

                        </div>

                    </div>

                    <div className="modal-footer" id="footer-periodo">
                        {error && <strong>{error}</strong>}
                        <button type="button" className="btn btn-success" onClick={() => AddSubmit()}>Guardar Periodo</button>

                    </div>

                </div>
            </div>
        </div>

    )


}
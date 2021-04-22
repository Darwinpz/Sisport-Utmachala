

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
        const peri_estado = document.getElementById("peri_estado").value

        setError("")

        add({ peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo:null, peri_estado }).then(() => {

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
                                placeholder="Abreviatura"
                                className="form-control border-primary"
                                name="peri_nombre"
                                id="peri_nombre"
                                required
                            />
                        </div>

                        <h5>Fecha de inicio: </h5>

                        <input className="form-control border-primary" placeholder="yyyy-mm-dd" name="fecha_inicio" id="fecha_inicio" />
                            
                        <h5 className="mt-3">Fecha de fin: </h5>
                        <input className="form-control border-primary" placeholder="yyyy-mm-dd" name="fecha_fin" id="fecha_fin" />


                        <h5 className="mt-3">Estado: </h5>
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
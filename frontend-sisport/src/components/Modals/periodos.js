

import useScript from "hooks/useScript";
import React, { useState } from "react";

import periodoService from 'services/periodos'

export default function ModalPeriodo() {


    useScript("/js/periodo.js")

    useScript("/js/picker.js")


    const [error, setError] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { add, update } = periodoService({ jwt })

    const AddSubmit = () => {

        const peri_nombre = document.getElementById("peri_nombre").value
        const peri_fecha_inicial = document.getElementById("fecha_inicio").value
        const peri_fecha_final = document.getElementById("fecha_fin").value
        const peri_estado = document.getElementById("peri_estado").value

        setError("")

        if (peri_nombre !== "" && peri_fecha_final !== "" && peri_fecha_inicial !== "" && peri_estado !== "") {

            if (peri_fecha_inicial < peri_fecha_final) {

                add({ peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo: null, peri_estado }).then(() => {

                    setError("Periodo Creado")

                    window.location.reload()

                }).catch(() => {

                    setError("Error al guardar, abreviatura o periodo ya existente")
                })

            } else {

                setError("La fecha de inicio no puede ser superior a la de fin")

            }

        } else {

            setError("Ingresa toda la información requerida")

        }


    }

    const UpdateSubmit = () => {

        const peri_nombre = document.getElementById("peri_nombre").value
        const peri_fecha_inicial = document.getElementById("fecha_inicio").value
        const peri_fecha_final = document.getElementById("fecha_fin").value
        const peri_estado = document.getElementById("peri_estado").value
        const peri_codigo = document.getElementById("peri_codigo").innerText

        setError("")

        if (peri_nombre !== "" && peri_fecha_final !== "" && peri_fecha_inicial !== "" && peri_estado !== "") {

            if (peri_fecha_inicial < peri_fecha_final) {

                update({ peri_codigo, peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo: null, peri_estado }).then(() => {

                    setError("Cambios guardados")

                    window.location.reload()

                }).catch((err) => {

                    if(err.message === "400"){

                        setError("El periodo tiene dependencias y no puede cambiarse")

                    }else{
                        
                        setError("Error al editar el periodo, revisa la abreviatura")

                    }

                    
                })

            } else {

                setError("La fecha de inicio no puede ser superior ni igual a la de fin")

            }

        } else {

            setError("Ingresa toda la información requerida")

        }

    }

    return (

        <div className="modal fade" id="periodo" tabIndex="-1" role="dialog" aria-labelledby="periodoModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">CREAR PERIODO</h5>
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
                        <button type="button" className="btn btn-success" id="btn_guardar_periodo" onClick={() => AddSubmit()}>Guardar Periodo</button>
                        <p style={{ display: "none" }} id="peri_codigo" className="modal-peri_codigo"></p>
                        <button type="button" className="btn btn-success" id="btn_editar_periodo" onClick={() => UpdateSubmit()}>Guardar Cambios</button>

                    </div>

                </div>
            </div>
        </div>

    )


}
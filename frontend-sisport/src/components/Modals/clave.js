
import useScript from "hooks/useScript";
import React, { useState } from "react";

import usuarioServices from 'services/usuarios'

export default function ModalAsignaturas() {

    const [error, setError] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { changepassword } = usuarioServices({ jwt })

    useScript("/js/clave.js")

    const handleSubmit = () => {

        const per_codigo = document.getElementById("per_codigo").innerText

        const per_clave = document.getElementById("per_clave").value
        const clave_repetida = document.getElementById("per_clave_repetida").value

        if (per_clave !== "" && clave_repetida !== "") {

            if (per_clave === clave_repetida) {

                changepassword({ per_codigo, per_clave }).then(() => {

                    window.location.reload()
                    setError("Clave actualizada correctamente")

                }).catch(() => {

                    setError("Error al cambiar la clave")

                })

            } else {

                setError("Las claves no coinciden")

            }


        } else {

            setError("Completa los campos requeridos")

        }

    }


    return (

        <div className="modal fade" id="clave" tabIndex="-1" role="dialog" aria-labelledby="claveModalLabel" aria-hidden="true">
            <div className="modal-dialog " role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">CAMBIAR CLAVE</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body" id="modal-body">

                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <h5>Clave Nueva: </h5>
                                <div className="form-group modal-clave">
                                    <input
                                        placeholder="Clave nueva"
                                        className="form-control border-primary"
                                        name="per_clave"
                                        id="per_clave"
                                        type="password"
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <h5>Repetir Clave: </h5>
                                <div className="form-group modal-clave">
                                    <input
                                        placeholder="Repetir clave"
                                        className="form-control border-primary"
                                        name="per_clave_repetida"
                                        id="per_clave_repetida"
                                        type="password"
                                    />
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="modal-footer" id="footer-clave">
                        {error && <strong id="error">{error}</strong>}
                        <p style={{ display: "none" }} id="per_codigo" className="modal-per_codigo"></p>
                        <button type="button" className="btn btn-success" onClick={() => handleSubmit()}>Cambiar Clave</button>
                    </div>

                </div>
            </div>
        </div>

    )


}
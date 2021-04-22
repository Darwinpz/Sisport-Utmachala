import useScript from "hooks/useScript";
import React, { useState } from "react";
import semestreService from 'services/semestres'

export default function ModalSemestre() {

    useScript("/js/semestre.js")

    const [error, setError] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { add } = semestreService({ jwt })

    const AddSumit = () => {

        const sem_paralelo = document.getElementById("sem_paralelo").value
        const sem_nombre = document.getElementById("sem_nombre").value
        const car_codigo = document.getElementById("car_codigo").value

        setError("")

        add({ sem_nombre, sem_paralelo, car_codigo }).then(() => {

            window.location.reload()

        }).catch(() => {

            setError("Error al guardar el semestre")
        })

    }

    return (

        <div className="modal fade" id="semestre" tabIndex="-1" role="dialog" aria-labelledby="semestreModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">CREAR SEMESTRE</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id="modal-body">

                        <h5>Nombre: </h5>
                        <div className="form-group modal-nombre">
                            <input
                                placeholder="Nombre del semestre"
                                className="form-control border-primary"
                                name="sem_nombre"
                                id="sem_nombre"
                            />
                        </div>

                        <h5>Paralelo: </h5>
                        <div className="form-group modal-paralelo">
                            <input
                                placeholder="Paralelo"
                                className="form-control border-primary"
                                name="sem_paralelo"
                                id="sem_paralelo"
                            />
                        </div>

                        <h5>Facultad: </h5>
                        <div className="form-group modal-facultad">

                            <select className="form-control border-primary" name="fac_codigo" id="fac_codigo" defaultValue="" required>
                                <option selected disabled value="">Selecciona la Facultad...</option>
                            </select>

                        </div>

                        <h5>Carrera: </h5>
                        <div className="form-group modal-carrera">

                            <select className="form-control  border-primary" name="car_codigo" id="car_codigo" defaultValue="" required>
                                <option selected disabled value="">Selecciona la Carrera...</option>
                            </select>

                        </div>

                    </div>
                    <div className="modal-footer" id="footer-semestre">

                        {error && <strong>{error}</strong>}
                        <button type="button" className="btn btn-success" onClick={() => AddSumit()}>Guardar Semestre</button>

                    </div>

                </div>
            </div>
        </div>

    )


}
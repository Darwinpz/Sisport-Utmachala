import React from 'react'

import VERsemestres from "components/Coordinacion/semestres"
import Modalsemestres from "components/Modals/semestres"

export default function SemestresPage() {
    return (
        <>
            <div className="row ">
                <div className="col ">

                    <a type="button" href="/asignaturas" className="btn btn-success mr-2"><i className="fas fa-chevron-left"></i> Volver</a>

                </div>
            </div>

            <div className="row mt-2">

                <div className="col">

                    <div className="card border-secondary">


                        <div className="card-header d-flex justify-content-between align-items-center">

                            <h4>Administración de Semestres:</h4>

                            <div className="card" style={{ backgroundColor: "transparent", border: "none" }}>

                                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#semestre">Crear Semestre</button>

                            </div>


                        </div>


                        <div className="card-body">

                            <VERsemestres/>

                        </div>

                    </div>

                </div>

            </div>

            <Modalsemestres/>

        </>
    )
}
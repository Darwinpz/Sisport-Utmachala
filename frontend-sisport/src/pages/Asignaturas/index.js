import React from 'react'

import VERasignaturas from "components/Coordinacion/asignaturas"


import Modalasignaturas from "components/Modals/asignaturas"

export default function AsignaturasPage() {
    return (
        <>
            <div className="row ">
                <div className="col ">

                    <a type="button" href="/periodos" className="btn btn-primary mr-2">Gestión de Periodos</a>
                    <a type="button" href="/semestres" className="btn btn-primary">Gestión de Semestres</a>

                </div>
            </div>
            <div className="row mt-2">

                <div className="col">

                    <div className="card border-secondary">


                        <div className="card-header d-flex justify-content-between align-items-center">

                            <h4>Administración de Asignaturas:</h4>

                            <div className="card" style={{ backgroundColor: "transparent", border: "none" }}>

                                <button type="button" className="btn btn-primary mb-2">Importar csv</button>
                                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#asignaturas">Crear Asignatura</button>

                            </div>


                        </div>


                        <div className="card-body">

                            <VERasignaturas />

                        </div>

                    </div>

                </div>

            </div>

            <Modalasignaturas/>

        </>
    )
}
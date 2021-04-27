import React from 'react'

import VERperiodos from "components/Coordinacion/periodos"

import Modalperiodos from "components/Modals/periodos"

export default function PeriodosPage() {
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

                            <h4>Administración de Periodos:</h4>

                            <div className="card" style={{ backgroundColor: "transparent", border: "none" }}>

                                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#periodo">Crear Periodo</button>

                            </div>


                        </div>


                        <div className="card-body">

                            <VERperiodos />

                        </div>

                    </div>

                </div>

            </div>

            <Modalperiodos/>
        </>
    )
}
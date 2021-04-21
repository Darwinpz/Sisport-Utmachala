import React from 'react'

import VERasignaturas from "components/Coordinacion/asignaturas"

export default function AsignaturasPage() {
    return (
        <>
            <div className="row">

                <div className="col">

                    <div className="card border-secondary">


                        <div className="card-header d-flex justify-content-between align-items-center">

                            <h4>Administración de Asignaturas:</h4>
                            <div className="card" style={{backgroundColor:"transparent", border:"none"}}>

                                <button type="button" className="btn btn-primary mb-2">Importar csv</button>
                                <button type="button" className="btn btn-success">Crear Asignatura</button>

                            </div>


                        </div>

                        <div className="card-body">

                            <VERasignaturas/>

                        </div>

                    </div>

                </div>

            </div>


        </>
    )
}
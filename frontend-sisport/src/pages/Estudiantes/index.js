import React from 'react'

import VERestudiantes from "components/Coordinacion/estudiantes"

export default function EstudiantesPage() {
    return (
        <>
            <div className="row">

                <div className="col">

                    <div className="card border-secondary">


                        <div className="card-header d-flex justify-content-between align-items-center">

                            <h4>Administración de Estudiantes:</h4>
                            <div className="card" style={{backgroundColor:"transparent", border:"none"}}>

                                <button type="button" className="btn btn-primary mb-2">Importar csv</button>
                                <button type="button" className="btn btn-success">Crear Estudiante</button>

                            </div>


                        </div>

                        <div className="card-body">

                                <VERestudiantes/>

                        </div>

                    </div>

                </div>

            </div>


        </>
    )
}
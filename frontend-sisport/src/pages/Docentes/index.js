import React from 'react'

import VERdocentes from "components/Coordinacion/docentes"

export default function DocentesPage() {
    return (
        <>
            <div className="row">

                <div className="col">

                    <div className="card border-secondary">


                        <div className="card-header d-flex justify-content-between align-items-center">

                            <h4>Administración de Docentes:</h4>
                            <div className="card" style={{backgroundColor:"transparent", border:"none"}}>

                                <button type="button" className="btn btn-primary mb-2">Importar csv</button>
                                <button type="button" className="btn btn-success">Crear Docente</button>

                            </div>


                        </div>

                        <div className="card-body">

                            <VERdocentes />

                        </div>

                    </div>

                </div>

            </div>


        </>
    )
}
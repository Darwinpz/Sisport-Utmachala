import React from 'react'

import VERestudiantes from "components/Coordinacion/estudiantes"

import ModalUpload from "components/Modals/upload"
import ModalUsuarios from "components/Modals/users"
import useScript from 'hooks/useScript'

export default function EstudiantesPage() {

    
    useScript("/js/modal_admin.js")

    return (
        <>
            <div className="row">

                <div className="col">

                    <div className="card border-secondary">


                        <div className="card-header d-flex justify-content-between align-items-center">

                            <h4>Administración de Estudiantes:</h4>
                            <div className="card" style={{ backgroundColor: "transparent", border: "none" }}>

                                <button type="button" data-toggle="modal" data-target="#subir" data-tipo="estudiante" data-titulo="ESTUDIANTES" data-cant="1" data-size="3" data-type=".xls, .xlsx, .csv" className="btn btn-primary mb-2">Importar csv</button>

                                <button type="button" className="btn btn-success" data-toggle="modal" data-per_tipo="ESTUDIANTE" data-target="#usuarios">Crear Estudiante</button>

                            </div>


                        </div>

                        <div className="card-body">

                            <VERestudiantes />

                        </div>

                    </div>

                </div>

            </div>

            <ModalUsuarios />

            <ModalUpload />

        </>
    )
}
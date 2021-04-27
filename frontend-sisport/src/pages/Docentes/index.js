import React from 'react'

import VERdocentes from "components/Coordinacion/docentes"
import ModalUpload from "components/Modals/upload"
import ModalUsuarios from "components/Modals/users"
import useScript from 'hooks/useScript'

export default function DocentesPage() {

    useScript("/js/modal_admin.js")

    return (
        <>
            <div className="row">

                <div className="col">

                    <div className="card border-secondary">


                        <div className="card-header d-flex justify-content-between align-items-center">

                            <h4>Administración de Docentes:</h4>
                            <div className="card" style={{ backgroundColor: "transparent", border: "none" }}>

                                <button type="button" data-toggle="modal" data-target="#subir" data-tipo="docente" data-titulo="DOCENTES" data-cant="1" data-size="3" data-type=".xls, .xlsx, .csv" className="btn btn-primary mb-2">Importar csv</button>

                                <button type="button" className="btn btn-success" data-toggle="modal" data-per_tipo="DOCENTE" data-target="#usuarios">Crear Docente</button>


                            </div>


                        </div>

                        <div className="card-body">

                            <VERdocentes />

                        </div>

                    </div>

                </div>

            </div>

            <ModalUsuarios />
            <ModalUpload />
        </>
    )
}

import React from "react";

export default function Archivos() {

    return (

        <div className="modal fade" id="archivo" tabIndex="-1" role="dialog" aria-labelledby="subirModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">ARCHIVO DE ASISTENCIA</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id="modal-body">
                        
                        <div className="row align-items-center">

                            <div className="col-lg-6 col-md-12 col-sm-12 text-center" >
                                <img src="/img/document.png" className=" img-fluid  border border-primary" />
                                <h4 className="mt-2 modal-nombre_archivo">Asistencia.docx</h4>
                            </div> 

                            <div className="col-lg-6 col-md-12 col-sm-12 ">

                                <button type="button" className="btn btn-block btn-success">Descargar</button>
                                <button type="button" className="btn btn-block btn-danger">Eliminar</button>

                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    )

}
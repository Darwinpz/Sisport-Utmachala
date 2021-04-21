
import React from "react";

export default function Archivos() {

    return (

        <div className="modal fade" id="archivo" tabIndex="-1" role="dialog" aria-labelledby="subirModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">ARCHIVOS</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id="modal-body">
                        
                        <div className="row align-items-center">

                            <div className="col-lg-6 col-md-12 col-sm-12 text-center" >
                                <img src="/img/document.png" className=" img-fluid  border border-primary" />
                                <h5 className="mt-2 modal-nombre_archivo">Archivo.docx</h5>
                            </div> 

                            <div className="col-lg-6 col-md-12 col-sm-12 ">

                                <a type="button" className="btn btn-block btn-success modal-ruta" href="#" >Descargar</a>
                                <button type="button" id="btn_eliminar_archivo" className="btn btn-block btn-danger">Eliminar</button>

                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    )

}
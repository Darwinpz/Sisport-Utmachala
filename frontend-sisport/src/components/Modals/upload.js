
import React from "react";

import useScript from 'hooks/useScript'

export default function Upload() {

    useScript("/js/modals.js")

    return (

        <div className="modal fade" id="subir" tabIndex="-1" role="dialog" aria-labelledby="subirModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Subir</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id="modal-body">

                        <p className="text-muted modal-cant mt-1 mb-1"></p>
                        <p className="text-muted modal-size mt-1 mb-1"></p>
                        <p className="text-muted modal-type mt-1"></p>

                        <div className="dropzone" id="myDropzone">
                            
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" id="btn_guardar">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

    )

}
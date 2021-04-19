
import React from "react";

export default function Diario() {

    return (

        <div className="modal fade" id="diario" tabIndex="-1" role="dialog" aria-labelledby="diarioModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">DIARIO METACOGNITIVO: </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success">Guardar Cambios</button>
                    </div>
                </div>
            </div>

        </div>

    )

}

import React from "react";

export default function Horarios({asig_nombre,id}) {

    return (

        <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="horarioModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">HORARIO DE CLASES DE: {asig_nombre}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success">Guardar Horario</button>
                    </div>
                </div>
            </div>

        </div>

    )

}

import React from "react";
import useDiarios from "hooks/useDiarios";

export default function Expectativas() {
    
    const { isLoading, updateExpectativas } = useDiarios()

    const handleSubmit = () => {

        var asig_codigo = document.getElementById("asig_codigo").innerText
        var peri_codigo = document.getElementById("peri_codigo").innerText

        var contenido = document.getElementById("expectativas_contenido").value

        updateExpectativas({asig_codigo,peri_codigo,contenido})

    }

    return (

        <div className="modal fade" id="expectativas" tabIndex="-1" role="dialog" aria-labelledby="subirModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">EXPECTATIVAS AL INICIAR EL CURSO</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id="modal-body">


                        <h5>Redacción de Expectativas: </h5>
                        <div className="form-group modal-informe">
                            <textarea
                                placeholder="Redacción de las expectativas hacia la asignatura..."
                                className="form-control border-primary"
                                name="expectativas_contenido"
                                id="expectativas_contenido"
                                style={{ height: "200px" }}
                            />
                        </div>

                    </div>

                    <div className="modal-footer">
                        {isLoading && <strong>Guardando cambios...</strong>}
                        {!isLoading && <strong>Guardado</strong>}
                        <button type="button" onClick={()=>handleSubmit()} className="btn btn-success">Guardar Cambios</button>
                    
                    </div>

                </div>
            </div>
        </div>

    )

}
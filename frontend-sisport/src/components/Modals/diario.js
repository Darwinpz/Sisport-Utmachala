
import useDiarios from "hooks/useDiarios";
import React from "react";

export default function Diario() {


    const {isLoading,updatediarios} = useDiarios()

    const handleSubmit = () => {

        var asig_codigo = document.getElementById("asig_codigo").innerText
        var peri_codigo = document.getElementById("peri_codigo").innerText
        var num_diario = document.getElementById("num_diario").innerText

        const tema = document.getElementById("tema").value
        const contenidos = document.getElementById("contenidos").value
        const objetivos = document.getElementById("objetivos").value
        const actividades = document.getElementById("actividades").value
        const estrategias = document.getElementById("estrategias").value
        const resumen = document.getElementById("resumen").value
        const preg1 = document.getElementById("preg1").value
        const preg2 = document.getElementById("preg2").value
        const preg3 = document.getElementById("preg3").value
        const preg4 = document.getElementById("preg4").value

        updatediarios({asig_codigo,peri_codigo,num_diario,tema,contenidos,objetivos,actividades,estrategias,resumen,preg1,preg2,preg3,preg4})
        

    };

    return (
        
        <div className="modal fade" id="diario" tabIndex="-1" role="dialog" aria-labelledby="diarioModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">DIARIO METACOGNITIVO:</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="row text-center mb-2">

                            <div className="col">

                                <h5 className="modal-materia">HORAS</h5>

                            </div>

                        </div>

                        <div className="row text-center mb-2">

                            <div className="col">

                                <h6 className="modal-fecha">FECHA</h6>


                            </div>

                            <div className="col">

                                <h6 className="modal-periodo">PERIODO</h6>

                            </div>

                        </div>

                        
                        <div className="form-group  modal-tema">
                            <input
                                placeholder="Tema"
                                className="form-control border-primary"
                                name="tema"
                                id="tema"                              
                            />
                        </div>

                        <div className="form-group modal-contenidos">
                            <input
                                placeholder="Contenidos"
                                className="form-control border-primary"
                                name="contenidos"
                                id="contenidos"
                            />
                        </div>

                        <div className="form-group modal-objetivos">
                            <input
                                type="text"
                                placeholder="Objetivo"
                                className="form-control border-primary"
                                name="objetivos"
                                id="objetivos"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Actividades"
                                className="form-control border-primary"
                                name="actividades"
                                id="actividades"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Estrategias"
                                className="form-control border-primary"
                                name="estrategias"
                                id="estrategias"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                type="text"
                                placeholder="Resumen"
                                className="form-control border-primary"
                                name="resumen"
                                id="resumen"
                            />
                        </div>
                        <h5>Reflexionar: </h5>
                        <span>¿Qué cosas fueron difíciles?:</span>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control border-primary"
                                placeholder="Respuesta..."
                                name="preg1"
                                id="preg1"
                            />
                        </div>
                        <span>¿Cuáles fueron fáciles?:</span>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control border-primary"
                                placeholder="Respuesta..."
                                name="preg2"
                                id="preg2"
                            />
                        </div>
                        <span>¿Por qué?:</span>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Respuesta..."
                                className="form-control border-primary"
                                name="preg3"
                                id="preg3"
                            />
                        </div>
                        <span>¿Qué aprendí hoy?:</span>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Respuesta..."
                                className="form-control border-primary"
                                name="preg4"
                                id="preg4"
                            />
                        </div>


                    </div>
                
                    <p className="modal-diario" style={{display:"none"}} id="num_diario"></p>

                    <div className="modal-footer" id="footer-diario">
                    {isLoading && <strong>Guardando cambios...</strong>}
                    {!isLoading && <strong>Guardado</strong>}
                        <button type="button" onClick={()=>handleSubmit()} className="btn btn-success">Guardar Cambios</button>
                    </div>
                </div>
            </div>

        </div>

    )

}
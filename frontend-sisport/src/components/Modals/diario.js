
import useDiarios from "hooks/useDiarios";
import React, { useState } from "react";

export default function Diario() {


    const [tema, setTEMA] = useState("");
    const [contenidos, setCONTENIDOS] = useState("");
    const [objetivos, setOBJETIVOS] = useState("");
    const [actividades, setACTIVIDADES] = useState("");
    const [estrategias, setESTRATEGIAS] = useState("");
    const [resumen, setRESUMEN] = useState("");
    const [preg1, setPREG1] = useState("");
    const [preg2, setPREG2] = useState("");
    const [preg3, setPREG3] = useState("");
    const [preg4, setPREG4] = useState("");

    const {isDiarioLoading,updatediarios} = useDiarios()

    const handleSubmit = () => {

        var asig_codigo = document.getElementById("asig_codigo").innerText
        var peri_codigo = document.getElementById("peri_codigo").innerText
        var num_diario = document.getElementById("num_diario").innerText

        //console.log(tema)
        updatediarios({asig_codigo,peri_codigo,num_diario,tema,contenidos,objetivos,actividades,estrategias,resumen,preg1,preg2,preg3,preg4})
        //updatediarios({as})
        //useDiarios({asig_codigo:1,peri_codigo:1,tema,contenido,objetivo,actividades,estrategias,resumen,preg1,preg2,preg3,preg4})

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
                                onChange={(e)=>setTEMA(e.target.value)}
                                value={tema}
                            />
                        </div>

                        <div className="form-group modal-contenido">
                            <input
                                placeholder="Contenidos"
                                className="form-control border-primary"
                                name="contenidos"
                                onChange={(e)=>setCONTENIDOS(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Objetivo"
                                className="form-control border-primary"
                                name="objetivos"
                                onChange={(e)=>setOBJETIVOS(e.target.value)}
                                value={objetivo}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Actividades"
                                className="form-control border-primary"
                                name="actividades"
                                onChange={(e)=>setACTIVIDADES(e.target.value)}
                                value={actividades}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Estrategias"
                                className="form-control border-primary"
                                name="estrategias"
                                onChange={(e)=>setESTRATEGIAS(e.target.value)}
                                value={estrategias}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                type="text"
                                placeholder="Resumen"
                                className="form-control border-primary"
                                name="resumen"
                                onChange={(e)=>setRESUMEN(e.target.value)}
                                value={resumen}
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
                                onChange={(e)=>setPREG1(e.target.value)}
                                value={preg1}
                            />
                        </div>
                        <span>¿Cuáles fueron fáciles?:</span>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control border-primary"
                                placeholder="Respuesta..."
                                name="preg2"
                                onChange={(e)=>setPREG2(e.target.value)}
                                value={preg2}
                            />
                        </div>
                        <span>¿Por qué?:</span>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Respuesta..."
                                className="form-control border-primary"
                                name="preg3"
                                onChange={(e)=>setPREG3(e.target.value)}
                                value={preg3}
                            />
                        </div>
                        <span>¿Qué aprendí hoy?:</span>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Respuesta..."
                                className="form-control border-primary"
                                name="preg4"
                                onChange={(e)=>setPREG4(e.target.value)}
                                value={preg4}
                            />
                        </div>


                    </div>
                
                    <p className="modal-diario" style={{display:"none"}} id="num_diario"></p>

                    <div className="modal-footer">
                    {isDiarioLoading && <strong>Guardando cambios...</strong>}
                    {!isDiarioLoading && <strong>Guardado</strong>}
                        <button type="button" onClick={()=>handleSubmit()} className="btn btn-success">Guardar Cambios</button>
                    </div>
                </div>
            </div>

        </div>

    )

}

import useDiarios from "hooks/useDiarios";
import React, { useEffect, useState } from "react";

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
        //console.log(objetivos)
        updatediarios({asig_codigo,peri_codigo,num_diario,tema,contenidos,objetivos,actividades,estrategias,resumen,preg1,preg2,preg3,preg4})
        

    };

    useEffect(()=>{

        setTEMA(document.getElementById("tema").value)
        setCONTENIDOS(document.getElementById("contenidos").value)
        setOBJETIVOS(document.getElementById("objetivos").value)
        setACTIVIDADES(document.getElementById("actividades").value)
        setESTRATEGIAS(document.getElementById("estrategias").value)
        setRESUMEN(document.getElementById("resumen").value)
        setPREG1(document.getElementById("preg1").value)
        setPREG2(document.getElementById("preg2").value)
        setPREG3(document.getElementById("preg3").value)
        setPREG4(document.getElementById("preg4").value)
    })

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
                                onChange={(e)=>setTEMA(e.target.value)}
                            />
                        </div>

                        <div className="form-group modal-contenidos">
                            <input
                                placeholder="Contenidos"
                                className="form-control border-primary"
                                name="contenidos"
                                id="contenidos"
                                onChange={(e)=>setCONTENIDOS(e.target.value)}
                            />
                        </div>

                        <div className="form-group modal-objetivos">
                            <input
                                type="text"
                                placeholder="Objetivo"
                                className="form-control border-primary"
                                name="objetivos"
                                id="objetivos"
                                onChange={(e)=>setOBJETIVOS(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Actividades"
                                className="form-control border-primary"
                                name="actividades"
                                id="actividades"
                                onChange={(e)=>setACTIVIDADES(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Estrategias"
                                className="form-control border-primary"
                                name="estrategias"
                                id="estrategias"
                                onChange={(e)=>setESTRATEGIAS(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                type="text"
                                placeholder="Resumen"
                                className="form-control border-primary"
                                name="resumen"
                                id="resumen"
                                onChange={(e)=>setRESUMEN(e.target.value)}
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
                                onChange={(e)=>setPREG1(e.target.value)}
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
                                onChange={(e)=>setPREG2(e.target.value)}
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
                                onChange={(e)=>setPREG3(e.target.value)}
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
                                onChange={(e)=>setPREG4(e.target.value)}
                            />
                        </div>


                    </div>
                
                    <p className="modal-diario" style={{display:"none"}} id="num_diario"></p>

                    <div className="modal-footer">
                    {isDiarioLoading && <strong>Guardando cambios...</strong>}
                    {!isDiarioLoading && <strong>Guardado</strong>}
                        <button type="button" onClick={(e)=>handleSubmit()} className="btn btn-success">Guardar Cambios</button>
                    </div>
                </div>
            </div>

        </div>

    )

}
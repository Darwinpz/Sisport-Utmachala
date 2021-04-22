
import React, { useState } from "react";

import archivosPythonService from 'services/python/archivos'
import portafolioService from 'services/portafolio'

export default function Archivos() {


    const {descargarArchivo,eliminarArchivo} = archivosPythonService({})

    const [error, setError] = useState("");

    const EliminarSubmit = () => {

        var peri_codigo = document.getElementById("peri_codigo").innerText
        var identificador = document.getElementById("identificador").innerText
        var fac_abreviatura = document.getElementById("esquema").innerText.split(".")[0]
        var car_abreviatura = document.getElementById("esquema").innerText.split(".")[1]
        var per_cedula = document.getElementById("per_cedula").innerText
        var tipo_archivo = document.getElementById("tipo_archivo").innerText
        var nombre_archivo = document.getElementById("archivo_nombre").innerText
        var asig_codigo = document.getElementById("asig_codigo").innerText

        const jwt = localStorage.getItem("jwt")

        const {removefiles} = portafolioService({jwt})

        setError("")

        eliminarArchivo({fac_abreviatura,car_abreviatura,asig_abreviatura:identificador+"-"+peri_codigo,per_cedula,tipo_archivo,nombre_archivo}).then(()=>{

            removefiles({asig_codigo,peri_codigo,tipo:tipo_archivo,nombre_archivo}).then(()=>{

                window.location.reload()

            }).catch(()=>{
                
                setError("Error al eliminar el registro del archivo, contacte con el coordinador o intente de nuevo")

            })

        }).catch(()=>{

            setError("Error al eliminar el archivo, contacte con el coordinador o intente de nuevo")

        })

    }
    
    const DescargarSubmit = () => {

        
        var peri_codigo = document.getElementById("peri_codigo").innerText
        var identificador = document.getElementById("identificador").innerText
        var fac_abreviatura = document.getElementById("esquema").innerText.split(".")[0]
        var car_abreviatura = document.getElementById("esquema").innerText.split(".")[1]
        var per_cedula = document.getElementById("per_cedula").innerText
        var tipo_archivo = document.getElementById("tipo_archivo").innerText
        var nombre_archivo = document.getElementById("archivo_nombre").innerText
        var est_cedula = document.getElementById("est_cedula")


        var cedula = per_cedula

        if(est_cedula){

            cedula = est_cedula.innerText
        }

        setError("")

        descargarArchivo({fac_abreviatura,car_abreviatura,asig_abreviatura:identificador+"-"+peri_codigo,per_cedula:cedula,tipo_archivo,nombre_archivo}).then((url)=>{

            var win = window.open(url, '_blank');
            win.focus();

        }).catch(()=>{

            setError("Error al descargar el archivo")

        })

    }

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
                                
                                <p style={{ display: "none" }} id="tipo_archivo" className="modal-tipo_archivo"></p>
                                <p style={{ display: "none" }} id="archivo_nombre" className="modal-archivo_nombre"></p>        

                                {error && <strong>{error}</strong>}
                                <button type="button" className="btn btn-block btn-success " onClick={() => DescargarSubmit()} >Descargar</button>  
                                <button type="button" id="btn_eliminar_archivo" onClick={() => EliminarSubmit()} className="btn btn-block btn-danger">Eliminar</button>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )

}
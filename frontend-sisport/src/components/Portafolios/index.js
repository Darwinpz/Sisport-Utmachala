
import React, { useState } from "react";

import usePortafolios from 'hooks/usePortafolios'
import usePerfil from 'hooks/usePerfil'
import Horario from 'components/Modals/horarios'
import useScript from "hooks/useScript";

export default function Portafolios() {

    const { portafolios } = usePortafolios()

    const { perfil } = usePerfil()

    const [clave,setCLAVE] = useState("");

    useScript("/js/modalhorario.js")

    return (

        <>
            {
                
                portafolios.map(({ periodo, asignaturas }) =>

                    <div key={`periodo-${periodo}`}>

                        <div className="row mb-3 border border-primary">

                            <div className="col text-center m-2">

                                <h3>* PERIODO {periodo} *</h3>

                                
                            </div>

                        </div>

                        <div className="row" >
                            {
                                asignaturas.map(({ asig_codigo, asig_nombre, sem_nombre,sem_codigo, sem_paralelo, asig_identificador,peri_codigo, docente, asig_est_estado, fac_abreviatura, car_abreviatura }) =>

                                    <div className="col-md-6 col-lg-4 mb-3" key={asig_codigo}>

                                        <div className="card border-primary" >

                                            <div className="card-header">
                                                <span><strong>{asig_nombre}</strong></span>
                                            </div>
                                            <div className="card-body" >
                                                <p className="card-text mb-1">{sem_nombre} {sem_paralelo}</p>
                                                <p className="card-text mb-1"><small className="text-muted">-{asig_identificador}-</small></p>
                                                {
                                                    perfil.per_tipo === "ESTUDIANTE" &&
                                                    <>
                                                        <p className="card-text mb-3">{docente}</p>
                                                        <a className="btn btn-success float-right " href={`/portafolios/ver/${asig_codigo}/${peri_codigo}/${sem_codigo}/${perfil.per_codigo}`}>Ver Portafolio</a>
                                                    

                                                    </>
                                                }

                                                {
                                                    perfil.per_tipo !== "ESTUDIANTE" &&

                                                    <>
                                                        {
                                                            asig_est_estado &&
                                                            <>
                                                                <a className="btn btn-primary float-right " href={`/portafolios/estudiantes/${asig_codigo}/${peri_codigo}/${sem_codigo}`}>Ver Portafolios</a>
                                                            </>

                                                        }

                                                        {
                                                            !asig_est_estado &&
                                                            <>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <input type="text" className="form-control mr-2" id={`clave_${asig_codigo}_${peri_codigo}`} value={clave} onChange={(e) => setCLAVE(e.target.value)} placeholder="Ingrese una clave de activación" required />
                                                                <button className="btn btn-success" type="button" data-toggle="modal" data-target="#horario" data-facultad={fac_abreviatura} data-carrera={car_abreviatura} data-identificador={asig_identificador} data-asig_codigo={asig_codigo} data-peri_codigo={peri_codigo} data-asignatura={asig_nombre} >Activar</button>
                                                                
                                                            
                                                            </div>
                                                            </>
                                                        }

                                                        

                                                    </>


                                                }

                                            </div>
                                        </div>

                                    </div>


                                )

                            }
                        </div>


                    </div>

                )


            }

            <Horario  />

        </>

    )

}
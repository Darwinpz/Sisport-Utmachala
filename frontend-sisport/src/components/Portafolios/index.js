
import React from "react";

import usePortafolios from 'hooks/usePortafolios'

export default function Portafolios() {

    const { portafolios } = usePortafolios()

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
                                asignaturas.map(({ asig_codigo, asig_nombre, sem_nombre, sem_paralelo, asig_identificador, docente }) =>

                                    <div className="col-md-6 col-lg-4 mb-3" key={asig_codigo}>

                                        <div className="card border-primary" >

                                            <div className="card-header">
                                                <span><strong>{asig_nombre}</strong></span>
                                            </div>
                                            <div className="card-body" >
                                                <p className="card-text mb-1">{sem_nombre} {sem_paralelo}</p>
                                                <p className="card-text mb-1"><small className="text-muted">-{asig_identificador}-</small></p>
                                                <p className="card-text mb-3">{docente}</p>
                                                <a className="btn btn-success float-right " href={`/portafolios/${asig_codigo}`}>Ver Portafolio</a>

                                            </div>
                                        </div>

                                    </div>

                                )
                            }
                        </div>

                    </div>

                )


            }


        </>

    )

}
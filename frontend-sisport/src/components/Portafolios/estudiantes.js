
import React from "react";

import useMatriculados from 'hooks/useMatriculados'

export default function Portafolios({asig_codigo,peri_codigo}) {
    
    const { matriculados } = useMatriculados({asig_codigo,peri_codigo})

    return (

        <>

            <div className="row mb-3 border border-primary">

                <div className="col text-center m-2">

                    <h3>* ASIGNATURA *</h3>

                </div>

            </div>

            <div className="row" >
                {
                    matriculados.map(({  per_codigo, per_nombre, per_apellido  }) =>

                        <div className="col-md-6 col-lg-3 mb-3" key={per_codigo}>

                            <div className="card border-primary" >

                                <div className="card-header">
                                    <span><strong>{per_nombre} {per_apellido}</strong></span>
                                </div>
                                <div className="card-body" >

                                    <a className="btn btn-success float-right " href={`/portafolios/ver/`} >Ver Portafolio</a>


                                </div>
                            </div>

                        </div>


                    )

                }
            </div>

        </>

    )

}
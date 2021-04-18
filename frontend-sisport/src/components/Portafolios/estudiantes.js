
import React from "react";

import useMatriculados from 'hooks/useMatriculados'

export default function Portafolios() {

    const { matriculados } = useMatriculados({asig_codigo:1,peri_codigo:1})

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

                        <div className="col-md-6 col-lg-4 mb-3" key={per_codigo}>

                            <div className="card border-primary" >

                                <div className="card-header">
                                    <span><strong></strong></span>
                                </div>
                                <div className="card-body" >
                                    <p className="card-text mb-1">{per_nombre} {per_apellido}</p>

                                    <a className="btn btn-success float-right " >Ver Portafolio</a>


                                </div>
                            </div>

                        </div>


                    )

                }
            </div>

        </>

    )

}
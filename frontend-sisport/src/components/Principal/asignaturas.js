
import React from "react";

export default function Asignaturas({ asignaturas }) {


    return (

        <>

            <div className="row align-items-center">
                {
                    asignaturas.map(({ asig_codigo,asig_nombre, sem_nombre, sem_paralelo, docente }) =>
                        <div className="col-md-6 col-lg-4 mb-3" key={asig_codigo}>

                            <div className="card border-primary">

                                <div className="card-body">

                                    <span className="card-title"><strong>{asig_nombre}</strong></span>
                                    <p className="card-text mb-1"><small className="text-muted">{sem_nombre}-{sem_paralelo}</small></p>
                                    <p className="card-text mb-3">{docente}</p>

                                    <div className="d-flex justify-content-between align-items-center">

                                        <input type="text" className="form-control mr-2" placeholder="Clave" required />
                                        <button className="btn btn-primary" type="button">Matricularme</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    )

                }
            </div>

        </>

    )

}
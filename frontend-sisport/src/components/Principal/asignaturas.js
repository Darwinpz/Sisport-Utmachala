
import React from "react";

export default function Asignaturas() {


    return (

        <>

            <div className="row">

                <div className="col-md-6 col-lg-4 mb-3">

                    <div className="card border-primary">

                        <div className="card-body">

                            <span className="card-title"><strong>Programación VII</strong></span>
                            <p className="card-text mb-1"><small className="text-muted">NOVENO SEMESTRE "A"</small></p>
                            <p className="card-text mb-3">Ing. Joofre Antonio Honores Tapia</p>

                            <div className="d-flex justify-content-between align-items-center">
                                
                                <input type="text" className="form-control mr-2" placeholder="Clave" required/>
                                <button className="btn btn-primary" type="button">Matricularme</button>
                            </div>

                        </div>
                    </div>

                </div>
            

            </div>

        </>

    )

}
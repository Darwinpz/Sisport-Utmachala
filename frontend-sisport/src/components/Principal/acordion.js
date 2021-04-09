
import React from "react";

import { Link } from 'wouter'

export default function Acordion() {


    return (

        <>

            <div className="accordion" id="accordionExample">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <button className="btn btn-block text-left " type="button" data-toggle="collapse" data-target="#collapseOne" >
                                <strong>Facultad de Ingeniería Civil</strong>
                            </button>
                        </h2>
                    </div>

                    <div id="collapseOne" className="collapse">
                        <ul className="list-group list-group-flush">
                            <Link to ="#"  type="button" className="list-group-item border-secondary">Carrera de Ingeniería Civil</Link>
                            <Link to ="#"  type="button" className="list-group-item border-secondary">Carrera de Ingeniería de Sistemas</Link>
                            <Link to ="#"   type="button" className="list-group-item border-secondary">Carrera de Ingeniería Ambiental</Link>
                        </ul>
                    </div>
                </div>
                
                
            </div>

        </>

    )

}
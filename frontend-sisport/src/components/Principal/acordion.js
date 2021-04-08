
import React from "react";

export default function Acordion() {


    return (

        <>

            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-block text-left " type="button" data-toggle="collapse" data-target="#collapseOne" >
                                <strong>Facultad de Ingeniería Civil</strong>
                            </button>
                        </h2>
                    </div>

                    <div id="collapseOne" class="collapse">
                        <ul class="list-group list-group-flush">
                            <a  type="button" class="list-group-item border-secondary">Carrera de Ingeniería Civil</a>
                            <a  type="button" class="list-group-item border-secondary">Carrera de Ingeniería de Sistemas</a>
                            <a  type="button" class="list-group-item border-secondary">Carrera de Ingeniería Ambiental</a>
                        </ul>
                    </div>
                </div>
                
                
            </div>

        </>

    )

}
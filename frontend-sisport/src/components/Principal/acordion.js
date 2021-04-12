
import React from "react";

import useCarreras from 'hooks/useCarreras'

export default function Acordion() {

    const { carreras } = useCarreras()

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
                            {
                                carreras.map(({car_codigo,car_nombre}) =>
                                
                                    <a href={`/principal/${car_nombre}`} key={car_codigo} type="button" className="list-group-item border-secondary">{car_nombre}</a>
                            
                                )
                            }
                            
                        </ul>
                    </div>
                </div>

            </div>

        </>

    )

}
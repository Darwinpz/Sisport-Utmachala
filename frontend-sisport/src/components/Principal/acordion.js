
import React from "react";

import useCarreras from 'hooks/useCarreras'

export default function Acordion() {

    const { carreras } = useCarreras()

    return (

        <>  {
            carreras.map(({ facultad, fac_id, carreras }) =>

                <div className="accordion" id={`accordion${fac_id}`} key={fac_id}>
                    <div className="card">
                        <div className="card-header" id={`heading${fac_id}`}>
                            <h2 className="mb-0">
                                <button className="btn btn-block text-left " type="button" data-toggle="collapse" data-target={`#collapse${fac_id}`} >
                                    <strong>{facultad}</strong>
                                </button>
                            </h2>
                        </div>

                        <div id={`collapse${fac_id}`} className="collapse">
                            <ul className="list-group list-group-flush">
                                {
                                    carreras.map(({ car_codigo, car_nombre }) =>

                                        <a href={`/principal/${car_nombre}`} key={car_codigo} type="button" className="list-group-item border-secondary">{car_nombre}</a>

                                    )
                                }

                            </ul>
                        </div>
                    </div>

                </div>
            )
        }


        </>

    )

}
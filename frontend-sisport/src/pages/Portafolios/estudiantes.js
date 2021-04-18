import React from 'react'
import Portafolios from 'components/Portafolios/estudiantes'



export default function PortafoliosEstudiantesPage({params}) {

    const {asig_codigo, peri_codigo} = params

    return (
        <>
            <div className="row">

                <div className="col">

                    <div className="card border-secondary">


                        <div className="card-header text-center">

                            <h4>PORTAFOLIOS DE LOS ESTUDIANTES</h4>

                        </div>

                        <div className="card-body">

                            <Portafolios asig_codigo={asig_codigo} peri_codigo={peri_codigo}/>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}
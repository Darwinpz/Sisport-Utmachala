import React from 'react'
import Portafolios from 'components/Portafolios/estudiantes'


export default function PortafoliosEstudiantesPage() {
    return (
        <>
            <div className="row">

                <div className="col">

                    <div className="card border-secondary">


                        <div className="card-header text-center">

                            <h4>PORTAFOLIOS DE LOS ESTUDIANTES</h4>

                        </div>

                        <div className="card-body">

                            <Portafolios/>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}
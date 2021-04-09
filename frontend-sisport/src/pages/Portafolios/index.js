import React from 'react'
import Portafolios from 'components/Portafolios/index'

export default function PortafolioPage() {
    return (
        <>
            <div className="row">

                <div className="col">

                    <div className="card border-secondary">


                        <div className="card-header text-center">

                            <h4>PORTAFOLIOS DE LAS ASIGNATURAS DE CLASES</h4>

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
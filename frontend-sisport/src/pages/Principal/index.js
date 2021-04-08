import React from 'react'
import Acordion from 'components/Principal/acordion'
import Asignaturas from 'components/Principal/asignaturas'

export default function PrincipalPage() {
    return (
        <>
            <div className="row">

                <div className="col col-sm-12 col-md-12 col-lg-3 mb-2 col-12">

                    <div className="card border-secondary">


                        <div className="card-header border-secondary">

                            <h4>Carreras</h4>

                        </div>

                        <div className="card-body">

                            <Acordion/>

                        </div>

                    </div>

                </div>

                <div class="col col-sm-12 col-md-12 col-lg-9 mb-2 col-12">


                    <div className="card  border-secondary">

                        <div className="card-header  border-secondary">

                            <h4> Asignaturas </h4>

                        </div>

                        <div className="card-body">

                            <Asignaturas/>

                        </div>


                    </div>


                </div>

            </div>

        </>
    )
}
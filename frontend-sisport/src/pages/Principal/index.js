import React from 'react'
import Acordion from 'components/Principal/acordion'
import Asignaturas from 'components/Principal/asignaturas'
import useAsignaturas from 'hooks/useAsignaturas'

export default function PrincipalPage({params}) {

    const { car_nombre } = params

    const { asignaturas} = useAsignaturas({car_nombre:decodeURI(car_nombre)})


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

                <div className="col col-sm-12 col-md-12 col-lg-9 mb-2 col-12">


                    <div className="card  border-secondary">

                        <div className="card-header  border-secondary">

                            <h4> ASIGNATURAS{`: ${decodeURI(car_nombre || "") }`}</h4>

                        </div>

                        <div className="card-body text-center">
                            {
                                !asignaturas &&
                                <h4>*SELECCIONA TU CARRERA*</h4>
                            }
                            
                            <Asignaturas asignaturas={asignaturas || []}/>

                        </div>


                    </div>


                </div>

            </div>

        </>
    )
}

import React, { useState } from "react";

import usePerfil from 'hooks/usePerfil'

import portafolioService from 'services/portafolio'
import portafolioPythonService from 'services/python/portafolio'

export default function Asignaturas({ asignaturas }) {


    const [error, setError] = useState("")

    const { perfil } = usePerfil()

    const jwt = window.localStorage.getItem("jwt")

    const { matricularse, eliminarPortafolio } = portafolioService({ jwt })

    const handleClick = (asig_codigo, peri_codigo, fac_nombre, car_nombre, asig_identificador) => {

        var clave = document.getElementById("clave_" + asig_codigo).value

        const { crearPortafolio } = portafolioPythonService()

        matricularse({ asig_codigo, peri_codigo, clave })
            .then(() => {

                crearPortafolio({ fac_nombre, car_nombre, asig_identificador: asig_identificador + "-" + peri_codigo, per_cedula: perfil.per_cedula }).then(() => {

                    window.location.reload()

                }).catch(() => {

                    eliminarPortafolio({ asig_codigo, peri_codigo, per_codigo: perfil.per_codigo }).then(() => {


                    }).catch(() => {

                        setError("No se eliminar portafolio,  contacte con el coordinador o intente de nuevo")

                    })

                    setError("No se puede crear las carpetas,  contacte con el coordinador o intente de nuevo")

                })


            })
            .catch(() => {

                setError(asig_codigo)

            })

    };

    return (

        <>

            <div className="row align-items-center">
                {
                    asignaturas.map(({ asig_codigo, asig_nombre, sem_nombre, sem_paralelo, asig_identificador, peri_nombre, peri_codigo, docente, matriculado, estado, fac_abreviatura, car_abreviatura }) =>
                        <div className="col-md-6 col-lg-4 mb-3" key={asig_codigo}>

                            <div className="card border-primary">

                                <div className="card-body">

                                    <span className="card-title"><small><strong>{asig_nombre}</strong></small></span>
                                    <p className="card-text mb-1"><small className="text-muted">{sem_nombre}-{sem_paralelo}: {peri_nombre}</small></p>
                                    <p className="card-text mb-3 "><small>{docente}</small></p>

                                    {
                                        !matriculado &&
                                        <>

                                            {
                                                estado &&
                                                <>
                                                    <div className="d-flex justify-content-between align-items-center">

                                                        <input type="text" className="form-control mr-2" id={`clave_${asig_codigo}`} placeholder="Clave" required />
                                                        <button className="btn btn-primary" type="button" onClick={() => handleClick(asig_codigo, peri_codigo, fac_abreviatura, car_abreviatura, asig_identificador)}>Matricularme</button>

                                                    </div>
                                                    {error === asig_codigo && <strong>Clave incorrecta</strong>}
                                                </>

                                            }

                                            {
                                                !estado &&
                                                <span className="btn float-center" >Asignatura No Activada</span>
                                            }

                                        </>

                                    }
                                    {
                                        matriculado &&
                                        <>
                                            <a className="btn btn-success float-right" href={`/portafolios/ver/${asig_codigo}/${peri_codigo}/${perfil.per_codigo}/${perfil.per_codigo}`} type="button">Ver Portafolio</a>

                                        </>
                                    }

                                </div>
                            </div>

                        </div>
                    )

                }
            </div>

        </>

    )

}
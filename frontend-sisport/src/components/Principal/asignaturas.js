
import React, {  useState } from "react";

import usePerfil from 'hooks/usePerfil'

import portafolioService from 'services/portafolio'
import portafolioPythonService from 'services/python/portafolio'

export default function Asignaturas({ asignaturas }) {


    const [clave, setCLAVE] = useState("");

    const [error, setError] = useState("")

    const { perfil } = usePerfil()

    const jwt = window.localStorage.getItem("jwt")

    const {matricularse,eliminarPortafolio} = portafolioService({jwt})

    const handleClick = () => {

        const asig_codigo = document.getElementById("asig_codigo").value
        const peri_codigo = document.getElementById("peri_codigo").value
        const fac_nombre = document.getElementById("fac_nombre").value
        const car_nombre = document.getElementById("car_nombre").value
        const asig_identificador = document.getElementById("asig_identificador").value

        matricularse({ asig_codigo, peri_codigo, clave})
            .then(() => {

                portafolioPythonService({fac_nombre,car_nombre,asig_identificador:asig_identificador+"-"+peri_codigo,per_cedula:perfil.per_cedula}).then(()=>{

                    window.location.reload()

                }).catch(()=>{

                    eliminarPortafolio({asig_codigo,peri_codigo,per_codigo:perfil.per_codigo}).then(()=>{


                    }).catch(()=>{
                    
                        setError("No se eliminar portafolio,  contacte con el coordinador o intente de nuevo")

                    })

                    setError("No se puede crear las carpetas,  contacte con el coordinador o intente de nuevo")

                })


            })
            .catch(() => {

                setError("Clave incorrecta")
            })

    };

    return (

        <>

            <div className="row align-items-center">
                {
                    asignaturas.map(({ asig_codigo, asig_nombre, sem_nombre, sem_paralelo,asig_identificador, peri_nombre, peri_codigo, docente, matriculado, estado, fac_abreviatura, car_abreviatura }) =>
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
                                                        <input style={{ display: "none" }} type="number" id="asig_codigo" className="form-control mr-2" onChange={() => asig_codigo} placeholder="asig_codigo" required value={asig_codigo} />
                                                        <input style={{ display: "none" }} type="number" id="peri_codigo" className="form-control mr-2" onChange={() => peri_codigo} placeholder="peri_codigo" required value={peri_codigo} />
                                                        <input style={{ display: "none" }} type="text" id="fac_nombre" className="form-control mr-2" onChange={() => fac_abreviatura} placeholder="fac_nombre" required value={fac_abreviatura} />
                                                        <input style={{ display: "none" }} type="text" id="car_nombre" className="form-control mr-2" onChange={() => car_abreviatura} placeholder="car_nombre" required value={car_abreviatura} />
                                                        <input style={{ display: "none" }} type="text" id="asig_identificador" className="form-control mr-2" onChange={() => asig_identificador} placeholder="asig_identificador" required value={asig_identificador} />
                                                        
                                                        <input type="text" className="form-control mr-2" onChange={(e) => setCLAVE(e.target.value)} placeholder="Clave" required />
                                                        <button className="btn btn-primary" type="button" onClick={() => handleClick()}>Matricularme</button>

                                                    </div>
                                                    {error && <strong>{error}</strong>}
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
                                            <a className="btn btn-success float-right" href={`/portafolios/ver/${asig_codigo}/${peri_codigo}/${perfil.per_codigo}`} type="button">Ver Portafolio</a>

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
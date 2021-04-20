
import React, {  useState } from "react";

import usePerfil from 'hooks/usePerfil'

import matriculaService from 'services/matricularse'

export default function Asignaturas({ asignaturas }) {


    const [clave, setCLAVE] = useState("");

    const [error, setError] = useState("")

    const { perfil } = usePerfil()

    const handleClick = () => {

        const asig_codigo = document.getElementById("asig_codigo").value
        const peri_codigo = document.getElementById("peri_codigo").value

        const jwt = window.localStorage.getItem("jwt")

        matriculaService({ asig_codigo, peri_codigo, clave, jwt })
            .then(() => {

                window.location.reload()

            })
            .catch(() => {

                setError("Clave incorrecta")
            })

    };

    return (

        <>

            <div className="row align-items-center">
                {
                    asignaturas.map(({ asig_codigo, asig_nombre, sem_nombre, sem_paralelo, peri_nombre, peri_codigo, docente, matriculado, estado }) =>
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
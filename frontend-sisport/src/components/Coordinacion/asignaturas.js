
import React, { useEffect, useState } from "react";

import asignaturaService from 'services/asignaturas'
import estructuraService from 'services/estructura'
import portafolioPythonService from 'services/python/portafolio'

export default function VERasignaturas() {

    const [asignaturas, setAsignaturas] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { all, remove } = asignaturaService({ jwt })

    const {removeEstructura} = estructuraService({jwt})

    const {removePortafolio} = portafolioPythonService()

    useEffect(() => {

        all()
            .then(asig => {

                setAsignaturas(asig)

                const script = document.createElement('script');

                script.src = "/js/table.js";
                script.async = true;

                document.body.appendChild(script);

            })
            .catch(() => {

            })

    }, [jwt, setAsignaturas])


    const removeItem = (asig_codigo) => {

        remove({ asig_codigo }).then(() => {

            window.location.reload()

        })
            .catch(() => {

                alert("No se puede borrar esta asignatura, tiene estudiantes asignados")

            })

    }


    const deleteItem = (asig_codigo, peri_codigo,fac_nombre,car_nombre,asig_identificador) => {

        
        removeEstructura({asig_codigo,peri_codigo}).then(()=>{


            removePortafolio({fac_nombre,car_nombre,asig_identificador}).then(()=>{

                window.location.reload()

            }).catch(()=>{

                alert("No se puede eliminar las carpetas, contacte con el coordinador o intente de nuevo")

            })

        }).catch(()=>{

            alert("No se puede eliminar la estructura, contacte con el coordinador o intente de nuevo")

        })


    }


    return (

        <>
            {asignaturas &&
                <div className="table-responsive " style={{ marginTop: "auto" }}>
                    <table id="table_estudiantes" width="100%" cellSpacing="0" className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Identificador</th>
                                <th scope="col">Asignatura</th>
                                <th scope="col">Semestre</th>
                                <th scope="col">Carrera</th>
                                <th scope="col">Periodo</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tfoot>
                        </tfoot>
                        <tbody>
                            {
                                asignaturas.map(({ asig_codigo, asig_identificador, fac_abreviatura, car_abreviatura, asig_nombre, sem_nombre, sem_codigo, sem_paralelo, peri_codigo, peri_nombre, car_nombre, estado }) =>

                                    <tr key={asig_codigo}>
                                        <td>{asig_identificador}</td>
                                        <td>{asig_nombre}</td>
                                        <td>{sem_nombre} {sem_paralelo}</td>
                                        <td>{car_nombre}</td>
                                        <td>{peri_nombre}</td>
                                        <td><button type="button" data-toggle="modal" data-target="#asignaturas" data-asig_codigo={asig_codigo} className="btn btn-success mr-2 mb-2"><i className="fas fa-edit"></i></button>
                                            <button type="button" className="btn btn-warning mr-2 mb-2" onClick={() => { if (window.confirm('¿Estás seguro de borrar esta asignatura?')) removeItem(asig_codigo) }}><i className="fas fa-eraser"></i></button>
                                            {estado &&

                                                <>
                                                    <a type="button" target="_blank" href={`/portafolios/estudiantes/${asig_codigo}/${peri_codigo}/${sem_codigo}`} className="btn btn-primary mr-2 mb-2"><i className="fas fa-eye"></i></a>
                                                    <button type="button" data-asig_codigo={asig_codigo} className="btn btn-danger mr-2 mb-2" onClick={() => { if (window.confirm('¿Estás seguro de eliminar esta asignatura?, esta acción borrará todos sus portafolios')) deleteItem(asig_codigo, peri_codigo,fac_abreviatura,car_abreviatura,asig_identificador+"-"+peri_codigo+"-"+sem_codigo) }} ><i className="fas fa-trash"></i></button>

                                                </>

                                            }

                                        </td>

                                    </tr>

                                )
                            }

                        </tbody>
                    </table>
                </div>
            }

        </>

    )

}
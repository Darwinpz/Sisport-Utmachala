
import React, { useEffect, useState } from "react";

import asignaturaService from 'services/asignaturas'

export default function VERasignaturas() {

    const [asignaturas, setAsignaturas] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { all, remove } = asignaturaService({ jwt })

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


    const deleteItem = (asig_codigo) => {

        remove({ asig_codigo }).then(() => {

            window.location.reload()

        })
            .catch(() => {

                alert("No se puede eliminar esta asignatura, tiene estudiantes asignados")

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
                                asignaturas.map(({ asig_codigo, asig_identificador, asig_nombre, sem_nombre, sem_paralelo, peri_nombre, car_nombre }) =>

                                    <tr key={asig_codigo}>
                                        <td>{asig_identificador}</td>
                                        <td>{asig_nombre}</td>
                                        <td>{sem_nombre} {sem_paralelo}</td>
                                        <td>{car_nombre}</td>
                                        <td>{peri_nombre}</td>
                                        <td><button type="button" data-toggle="modal" data-target="#asignaturas" data-asig_codigo={asig_codigo} className="btn btn-primary mr-2 mb-2"><i className="fas fa-edit"></i></button>
                                            <button type="button" className="btn btn-danger mb-2" onClick={() => { if (window.confirm('¿Estás seguro de eliminar esta asignatura?')) deleteItem(asig_codigo) }}><i className="fas fa-trash"></i></button></td>

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

import React, { useEffect, useState } from "react";

import semestreService from 'services/semestres'

export default function VERsemestres() {


    const [data, setData] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { all, remove } = semestreService({ jwt })


    useEffect(() => {

        all({})
            .then(sem => {

                setData(sem)

                const script = document.createElement('script');

                script.src = "/js/table.js";
                script.async = true;

                document.body.appendChild(script);

            })
            .catch(() => {

            })


    }, [jwt, setData])

    const deleteItem = (sem_codigo, peri_codigo) => {

        remove({ sem_codigo, peri_codigo }).then(() => {

            window.location.reload()

        }).catch(() => {


            alert("No se puede eliminar este semestre, tiene asignaturas asignadas")

        })


    }

    return (

        <>
            {data &&
                <div className="table-responsive " style={{ marginTop: "auto" }}>
                    <table id="table_semestres" width="100%" cellSpacing="0" className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Paralelo</th>
                                <th scope="col">Periodo</th>
                                <th scope="col">Carrera</th>
                                <th scope="col">Facultad</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tfoot>
                        </tfoot>
                        <tbody>
                            {
                                data.map(({ sem_codigo, sem_nombre, sem_paralelo, peri_codigo, peri_nombre, car_nombre, fac_nombre }) =>

                                    <tr key={sem_codigo}>
                                        <td>{sem_nombre}</td>
                                        <td>{sem_paralelo}</td>
                                        <td>{peri_nombre}</td>
                                        <td>{car_nombre}</td>
                                        <td>{fac_nombre}</td>
                                        <td className="text-center"><button type="button" className="btn btn-danger mb-2" onClick={() => { if (window.confirm('¿Estás seguro de eliminar este semestre?')) deleteItem(sem_codigo, peri_codigo) }}><i className="fas fa-trash"></i></button></td>

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
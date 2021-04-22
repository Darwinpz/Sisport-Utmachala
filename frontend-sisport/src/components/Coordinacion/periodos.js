
import React, { useEffect, useState } from "react";

import periodoService from 'services/periodos'


export default function VERperiodos() {


    const [data, setData] = useState("")

    const jwt = localStorage.getItem("jwt")

    
    const { all } = periodoService({ jwt })


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

    return (

        <>
            {data &&
                <div className="table-responsive " style={{ marginTop: "auto" }}>
                    <table id="table_periodos" width="100%" cellSpacing="0" className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Abreviatura</th>
                                <th scope="col">Fecha inicial</th>
                                <th scope="col">Fecha final</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tfoot>
                        </tfoot>
                        <tbody>
                            {
                                data.map(({ peri_codigo, peri_nombre, peri_fecha_inicial, peri_fecha_final, peri_estado }) =>

                                    <tr key={peri_codigo}>
                                        <td>{peri_nombre}</td>
                                        <td>{peri_fecha_inicial.split("T")[0]}</td>
                                        <td>{peri_fecha_final.split("T")[0]}</td>
                                        <td>{peri_estado}</td>
                                        <td><a type="button" href={`/periodos/editar/${peri_codigo}`} className="btn btn-primary mr-2 mb-2"><i className="fas fa-eye"></i></a>
                                        <a type="button" href={`/periodos/eliminar/${peri_codigo}`} className="btn btn-danger mb-2"><i className="fas fa-trash"></i></a></td>

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
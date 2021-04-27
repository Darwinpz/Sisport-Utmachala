
import React, { useEffect, useState } from "react";

import periodoService from 'services/periodos'


export default function VERperiodos() {


    const [data, setData] = useState("")

    const jwt = localStorage.getItem("jwt")

    
    const { all, remove } = periodoService({ jwt })


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

    const deleteItem = (peri_codigo) =>{

        remove({peri_codigo}).then(()=>{

            window.location.reload()

        }).catch(()=>{


            alert("No se puede eliminar este Periodo, tiene semestres y asignaturas asignadas")

        })

    }

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
                                        <td><button type="button" data-toggle="modal" data-target="#periodo" data-periodo={peri_codigo} className="btn btn-primary mr-2 mb-2"><i className="fas fa-edit"></i></button>
                                        <button className="btn btn-danger mb-2" onClick={() => { if (window.confirm('¿Estás seguro de eliminar este periodo?')) deleteItem(peri_codigo) }}><i className="fas fa-trash"></i></button></td>

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
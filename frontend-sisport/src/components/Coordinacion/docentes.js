
import React, { useEffect, useState } from "react";

import usuariosService from 'services/usuarios'

export default function VERdocentes() {


    const [data, setData] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { usuarios } = usuariosService({ jwt })

    useEffect(() => {

        usuarios({ rol: "DOCENTE", jwt })
            .then(docentes => {

                setData(docentes)

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
                    <table id="table_docentes" width="100%" cellSpacing="0" className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Cedula</th>
                                <th scope="col">Título</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tfoot>
                        </tfoot>
                        <tbody>
                            {
                                data.map(({ per_codigo, per_cedula,per_titulo, per_nombre, per_apellido, per_correo }) =>

                                    <tr key={per_codigo}>
                                        <th>{per_cedula}</th>
                                        <td>{per_titulo}</td>
                                        <td>{per_nombre}</td>
                                        <td>{per_apellido}</td>
                                        <td>{per_correo}</td>
                                        <td><a type="button" href={`/docentes/editar/${per_codigo}`} className="btn btn-primary"><i className="fas fa-eye"></i></a></td>

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
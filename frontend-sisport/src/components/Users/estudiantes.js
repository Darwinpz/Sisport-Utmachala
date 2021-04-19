
import React from "react";

import useUsuarios from 'hooks/useUsuarios'
import useScript from 'hooks/useScript'

export default function VERestudiantes() {

    const { usuarios } = useUsuarios({ rol: "ESTUDIANTE" })

    useScript("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js")
    useScript("https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js")
    useScript("/js/table.js")

    return (

        <>
            {usuarios &&
                <div className="table-responsive " style={{ marginTop: "auto" }}>
                    <table id="table" width="100%" cellSpacing="0" className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Cedula</th>
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
                               usuarios.map(({ per_codigo, per_cedula, per_nombre, per_apellido, per_correo }) =>

                                    <tr key={per_codigo}>
                                        <th>{per_cedula}</th>
                                        <td>{per_nombre}</td>
                                        <td>{per_apellido}</td>
                                        <td>{per_correo}</td>
                                        <td><a type="button" href={`/estudiantes/editar/${per_codigo}`} className="btn btn-primary"><i className="fas fa-eye"></i></a></td>

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
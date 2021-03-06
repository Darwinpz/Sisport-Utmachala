
import React, { useEffect, useState }  from "react";

import usuariosService from 'services/usuarios'

export default function VERestudiantes() {

    const [data, setData] = useState("")

    const jwt = localStorage.getItem("jwt")

    const {usuarios,remove} = usuariosService({jwt})

    useEffect(() => {

        usuarios({ rol: "ESTUDIANTE"})
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


    const deleteUser = (per_codigo) =>{

        remove({per_codigo}).then(()=>{

            window.location.reload()

        }).catch(()=>{

            alert("No se puede eliminar este estudiante, tiene dependencias")

        })

    }


    return (

        <>
            {data &&
                <div className="table-responsive " style={{ marginTop: "auto" }}>
                    <table id="table_estudiantes" width="100%" cellSpacing="0" className="table table-hover ">
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
                               data.map(({ per_codigo, per_tipo, per_cedula, per_nombre, per_apellido, per_correo }) =>

                                    <tr key={per_codigo}>
                                        <th>{per_cedula}</th>
                                        <td>{per_nombre}</td>
                                        <td>{per_apellido}</td>
                                        <td>{per_correo}</td>
                                        <td><button type="button" data-toggle="modal" data-target="#usuarios" data-per_codigo={per_codigo} data-per_tipo={per_tipo} className="btn btn-primary mr-2 mb-2"><i className="fas fa-eye"></i></button>
                                        <button type="button" onClick={() => { if (window.confirm('¿Estás seguro de eliminar el estudiante?')) deleteUser(per_codigo) }} className="btn btn-danger mb-2"><i className="fas fa-trash"></i></button>
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
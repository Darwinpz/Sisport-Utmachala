
import useScript from "hooks/useScript";
import React, { useState } from "react";
import usariosServices from 'services/usuarios'

export default function ModalUsuarios() {


    const [error, setError] = useState("")

    const jwt = localStorage.getItem("jwt")

    const { add, update } = usariosServices({ jwt })

    useScript("/js/picker.js")
    useScript("/js/users.js")

    const handleSubmit = () => {

        const per_cedula = document.getElementById("per_cedula").value
        const per_nombre = document.getElementById("per_nombre").value.toUpperCase() 
        const per_apellido = document.getElementById("per_apellido").value.toUpperCase() 
        const per_tipo = document.getElementById("per_tipo").innerText
        const per_titulo = document.getElementById("per_titulo").value.toUpperCase()
        const per_fecha_nacimiento = document.getElementById("fecha_nacimiento").value
        const per_correo = document.getElementById("per_correo").value
        const per_direccion = document.getElementById("per_direccion").value
        const per_pais = document.getElementById("per_pais").value.toUpperCase() 
        const per_provincia = document.getElementById("per_provincia").value.toUpperCase() 
        const per_ciudad = document.getElementById("per_ciudad").value.toUpperCase() 
        const per_sexo = document.getElementById("per_sexo").value
        const per_telef_fijo = document.getElementById("per_telef_fijo").value
        const per_telef_celular = document.getElementById("per_telef_celular").value

        add({
            per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento,
            per_edad: null, per_correo, per_facebook: null, per_direccion, per_pais, per_provincia, per_ciudad,
            per_sexo, per_estado_civil: null, per_telef_fijo, per_telef_celular
        }).then(() => {

            setError("Usuario creado")

            window.location.reload()

        }).catch(() => {

            setError("Error al crear, usuario existente")

        })

    }


    const UpdateSubmit = () => {

        const per_codigo = document.getElementById("per_codigo").innerText
        const per_cedula = document.getElementById("per_cedula").value
        const per_nombre = document.getElementById("per_nombre").value.toUpperCase() 
        const per_apellido = document.getElementById("per_apellido").value.toUpperCase() 
        const per_tipo = document.getElementById("per_tipo").innerText
        const per_titulo = document.getElementById("per_titulo").value.toUpperCase() 
        const per_fecha_nacimiento = document.getElementById("fecha_nacimiento").value
        const per_correo = document.getElementById("per_correo").value
        const per_direccion = document.getElementById("per_direccion").value
        const per_pais = document.getElementById("per_pais").value.toUpperCase() 
        const per_provincia = document.getElementById("per_provincia").value.toUpperCase() 
        const per_ciudad = document.getElementById("per_ciudad").value.toUpperCase() 
        const per_sexo = document.getElementById("per_sexo").value
        const per_telef_fijo = document.getElementById("per_telef_fijo").value
        const per_telef_celular = document.getElementById("per_telef_celular").value

        update({
            per_codigo, per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento, per_correo,
            per_facebook:null, per_direccion, per_pais, per_provincia, per_ciudad, per_sexo, per_estado_civil:null, per_telef_fijo,
            per_telef_celular
        }).then(() => {

            setError("Usuario actualizado")

            window.location.reload()

        }).catch(() => {

            setError("Error al actualizar el usuario")

        })

    }

    return (

        <div className="modal fade" id="usuarios" tabIndex="-1" role="dialog" aria-labelledby="usuariosModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">CREAR USUARIOS</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id="modal-body">

                        <div className="form-row">

                            <div className="form-group col-md-6">

                                <h5>Cédula: </h5>
                                <div className="form-group modal-cedula">
                                    <input
                                        placeholder="Cédula del usuario"
                                        className="form-control border-primary"
                                        name="per_cedula"
                                        id="per_cedula"
                                    />
                                </div>

                            </div>

                            <div className="form-group col-md-6">

                                <h5>Correo: </h5>
                                <div className="form-group modal-correo">
                                    <input
                                        placeholder="Correo electrónico"
                                        className="form-control border-primary"
                                        name="per_correo"
                                        id="per_correo"
                                        type="email"
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <h5>Nombre: </h5>
                                <div className="form-group modal-nombre">
                                    <input
                                        placeholder="Nombres completos"
                                        className="form-control border-primary"
                                        name="per_nombre"
                                        id="per_nombre"
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <h5>Apellido: </h5>
                                <div className="form-group modal-nombre">
                                    <input
                                        placeholder="Apellidos completos"
                                        className="form-control border-primary"
                                        name="per_apellido"
                                        id="per_apellido"
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <h5>Sexo: </h5>
                                <div className="form-group modal-sexo">

                                    <select className="form-control  border-primary" name="per_sexo" id="per_sexo" required>
                                        <option selected disabled value="">Selecciona un sexo...</option>
                                        <option value="MASCULINO">MASCULINO</option>
                                        <option value="FEMENINO">FEMENINO</option>
                                        <option value="OTRO">OTRO</option>
                                    </select>

                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <h5>Fecha de nacimiento: </h5>

                                <input className="form-control border-primary" placeholder="yyyy-mm-dd" name="fecha_nacimiento" id="fecha_nacimiento" />

                            </div>

                        </div>


                        <h5 id="abreviatura_titulo">Abreviatura del Título: </h5>
                        <div className="form-group modal-titulo">
                            <input
                                placeholder="Título del usuario"
                                className="form-control border-primary"
                                name="per_titulo"
                                id="per_titulo"
                            />
                        </div>

                        <div className="form-row">

                            <div className="form-group col-md-4">

                                <h5>País: </h5>
                                <div className="form-group modal-pais">
                                    <input
                                        placeholder="País"
                                        className="form-control border-primary"
                                        name="per_pais"
                                        id="per_pais"
                                    />
                                </div>

                            </div>
                            <div className="form-group col-md-4">
                                <h5>Provincia: </h5>
                                <div className="form-group modal-provincia">
                                    <input
                                        placeholder="Provincia"
                                        className="form-control border-primary"
                                        name="per_provincia"
                                        id="per_provincia"
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4">
                                <h5>Ciudad: </h5>
                                <div className="form-group modal-ciudad">
                                    <input
                                        placeholder="Ciudad"
                                        className="form-control border-primary"
                                        name="per_ciudad"
                                        id="per_ciudad"
                                    />
                                </div>

                            </div>


                        </div>

                        <h5>Dirección: </h5>
                        <div className="form-group modal-direccion">
                            <textarea
                                placeholder="Dirección domiciliaria"
                                className="form-control border-primary"
                                name="per_direccion"
                                id="per_direccion"
                            />
                        </div>


                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <h5>Telefono fijo: </h5>
                                <div className="form-group modal-telef_fijo">
                                    <input
                                        placeholder="Teléfono fijo"
                                        className="form-control border-primary"
                                        name="per_telef_fijo"
                                        id="per_telef_fijo"
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <h5>Telefono celular: </h5>
                                <div className="form-group modal-telef_celular">
                                    <input
                                        placeholder="Teléfono celular"
                                        className="form-control border-primary"
                                        name="per_telef_celular"
                                        id="per_telef_celular"
                                    />
                                </div>
                            </div>

                        </div>




                    </div>

                    <div className="modal-footer" id="footer-usuarios">
                        {error && <strong>{error}</strong>}
                        <button type="button" className="btn btn-success" id="btn_guardar_usuario" onClick={() => handleSubmit()}>Guardar Usuario</button>
                        <p style={{ display: "none" }} id="per_codigo" className="modal-per_codigo"></p>
                        <p style={{ display: "none" }} id="per_tipo" className="modal-per_tipo"></p>
                        <button type="button" className="btn btn-success" id="btn_editar_usuario" onClick={() => UpdateSubmit()}>Guardar Cambios</button>
                    </div>

                </div>
            </div>
        </div>

    )


}
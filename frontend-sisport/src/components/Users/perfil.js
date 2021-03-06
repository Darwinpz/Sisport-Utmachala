
import React from "react";


import usePerfil from 'hooks/usePerfil'
import ModalClave from "components/Modals/clave"


export default function Perfil() {

    const { loading, perfil } = usePerfil()


    return (

        <>
            {
                !loading &&
                <div className="row">

                    <div className="col col-sm-12 col-md-12 col-lg-5 mb-2 col-12 text-center">

                        <img src="/img/logo_utmach.png" width="70%" alt="" className="img-fluid" />

                    </div>

                    <div className="col col-sm-12 col-md-12 col-lg-7 mb-2 col-12">

                        <div className="card border-danger">

                            <div className="card-header text-white bg-danger ">

                                <div className="d-flex justify-content-between align-items-center">

                                    <h4>Mi Perfil</h4>
                                    <button type="button" className="btn btn-success" data-toggle="modal" data-per_codigo={perfil.per_codigo} data-target="#clave">Cambiar clave</button>

                                </div>

                            </div>

                            <div className="card-body">
                                <div className="row ">
                                    <div className="col">
                                        <h3 className="text-center ">{perfil.per_nombre} {perfil.per_apellido}</h3>
                                    </div>

                                </div>
                                <div className="row mt-2">

                                    <div className="col">
                                        <p className="text-left"><strong>Correo:</strong></p>
                                        <p className="text-nowrap text-left">{perfil.per_correo}</p>
                                        <p className="text-left"><strong>Tipo de Usuario:</strong></p>
                                        <p className="text-left">{perfil.per_tipo}</p>

                                    </div>

                                    <div className="col">

                                        <p className="text-left"><strong>Celular:</strong></p>
                                        <p className="text-left">{perfil.per_telef_celular || 'Ninguno'}</p>
                                        <p className="text-left"><strong>Sexo</strong></p>
                                        <p className="text-left">{perfil.per_sexo}</p>

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col">

                                        <p className="text-left"><strong>Dirección:</strong></p>
                                        <p className="text-left">{perfil.per_direccion}</p>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>


            }

            <ModalClave />

        </>

    )

}
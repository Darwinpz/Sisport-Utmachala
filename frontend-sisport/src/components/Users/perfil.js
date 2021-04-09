
import React from "react";

export default function Perfil() {


    return (

        <>

            <div className="row">

                <div className="col col-sm-12 col-md-12 col-lg-5 mb-2 col-12 text-center">

                    <img src="/img/logo_utmach.png" width="70%" alt="" className="img-fluid" />

                </div>

                <div className="col col-sm-12 col-md-12 col-lg-7 mb-2 col-12">

                    <div className="card border-danger">

                        <div className="card-header text-white bg-danger">

                            <div className="card-title">
                                <h4>Mi Perfil</h4>
                            </div>

                        </div>

                        <div className="card-body">
                            <div className="row ">
                                <div className="col">
                                    <h3 className="text-center ">Darwin Pilaloa</h3>
                                </div>

                            </div>
                            <div className="row mt-2">

                                <div className="col">
                                    <p className="text-left"><strong>Correo:</strong></p>
                                    <p className="text-nowrap text-left">@gmail.com</p>
                                    <p className="text-left"><strong>Tipo de Usuario:</strong></p>
                                    <p className="text-left">Estudiante</p>
                                    <p className="text-left"><strong>Titulo</strong></p>
                                    <p className="text-left"></p>

                                </div>

                                <div className="col">
                                    <p className="text-left"><strong>Dirección:</strong></p>
                                    <p className="text-nowrap text-left">machala</p>
                                    <p className="text-left"><strong>Celular:</strong></p>
                                    <p className="text-left">0999999</p>
                                    <p className="text-left"><strong>Sexo</strong></p>
                                    <p className="text-left">asdas@gmail.com</p>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </>

    )

}
import React from 'react'
import Login from 'components/Login'

export default function LoginPage() {
    return (
        <>
            <div className="row mt-2">

                <div className="col-ml-6 mx-auto">

                    <div className="container text-center">

                        <img src={'/img/logo_utmach.png'} width="50%" alt="" />

                    </div>

                    <div className="card mt-5 border-danger">

                        <div className="card-body">
                            <h5 className="card-title">Inicio de Sesión</h5>
                            <Login />
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}
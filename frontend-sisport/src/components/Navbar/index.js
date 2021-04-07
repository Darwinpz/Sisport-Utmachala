import React from 'react'
import { Link } from 'wouter'

export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top p-1 navbar-static-top">

            <div className="container">

                <a className="navbar-brand" href="/">Sistema de Gestión de Portafolios</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ml-auto flex-row flex justify-content-around">

                        <li className="nav-item active">

                            <a type="button" href="/notificaciones" className="nav-link px-sm-5 px-lg-1"><strong
                                className="notificacion">0</strong><i className="fas fa-bell fa-lg px-2"></i></a>
                        </li>

                        <li className="nav-item active">
                            <Link to="/portafolios" className="nav-link"><i className="fas fa-book"></i>Portafolios</Link>
                        </li>

                        <li className="nav-item dropdown active">

                            <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown">@gmail</a>

                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/perfil/@{{sesion.per_correo}}">Perfil</a>
                                <Link to="/salir" className="dropdown-item">Salir</Link>
                            </div>
                        </li>

                        <li className="nav-item active">
                            <Link to="/login" className="nav-link"><i className="fas fa-sign-in-alt"></i>Ingresar</Link>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>

    )

}
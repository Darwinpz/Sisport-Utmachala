import React from 'react'
import { Link } from 'wouter'

import useUser from 'hooks/useUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faBook, faUser, faHome } from '@fortawesome/free-solid-svg-icons'


export default function Navbar() {


    const { isLogged, logout } = useUser()

    const cerrarSesion = (e) => {

        e.preventDefault()
        logout()
        window.location.href = "/"
    };

    const renderLoginButtons = ({ isLogged }) => {

        return isLogged
            ?
            <>

                <li className="nav-item active">
                    <Link to="/principal" className="nav-link"><FontAwesomeIcon icon={faHome} /> Principal</Link>
                </li>

                <li className="nav-item active">
                    <Link to="/portafolios" className="nav-link"><FontAwesomeIcon icon={faBook} /> Portafolios</Link>
                </li>
                
                <li className="nav-item dropdown active">

                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-toggle="dropdown">@gmail</Link>

                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/perfil"><FontAwesomeIcon icon={faUser} /> Perfil</Link>
                        <Link onClick={cerrarSesion} to="#" className="dropdown-item" type="button" ><FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión</Link>
                    </div>
                </li>
            </>
            :
            <li className="nav-item active">
                <Link to="/login" className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Ingresar</Link>
            </li>

    }

    const content =  renderLoginButtons({ isLogged })

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top p-1 navbar-static-top">

            <div className="container">

                <Link className="navbar-brand" to="/">Sistema de Gestión de Portafolios</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ml-auto flex-row flex justify-content-around">

                        {content}

                    </ul>
                </div>

            </div>
        </nav>

    )

}
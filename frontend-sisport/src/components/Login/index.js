
import React, { useState } from "react";
import { useLocation } from "wouter"
import useUser from 'hooks/useUser'
import { useEffect } from "react";

export default function Login({ onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [, navigate] = useLocation()

    const { isLoginLoading, hasLoginError, login, isLogged } = useUser()

    useEffect(() => {
        if (isLogged) {
            navigate('/portafolios')
            onLogin && onLogin()
        }
    }, [isLogged, navigate, onLogin])


    const handleSubmit = (e) => {
        e.preventDefault();

        login({ username, password })

    };


    return (
        <>
            {isLoginLoading && <strong>Verificando Credenciales...</strong>}
            {!isLoginLoading &&
                <form className='form' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            placeholder="Cédula"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="form-control border-primary"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Clave"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="form-control border-primary"
                        />
                    </div>

                    <button className="btn btn-block btn-primary">Iniciar Sesión</button>
                </form>
            }{
                hasLoginError && <strong>Credenciales incorrectas</strong>
            }
        </>
    )


}
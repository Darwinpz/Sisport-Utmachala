import { useCallback, useContext, useState } from 'react'
import Context from 'context/UserContext'
import loginService from 'services/login'
import matriculaService from 'services/matricularse'

export default function useUser() {

    const { matricula, jwt, setMATRICULA, setJWT } = useContext(Context)
    const [state, setState] = useState({ loading: false, error: false })

    const login = useCallback(({ username, password }) => {
        setState({ loading: true, error: false })
        loginService({ username, password })
            .then(jwt => {
                //window.sessionStorage.setItem('jwt', jwt)
                localStorage.setItem('jwt', jwt)
                setState({ loading: false, error: false })
                setJWT(jwt)
            })
            .catch(err => {
                //window.sessionStorage.removeItem('jwt')
                localStorage.removeItem('jwt')
                setState({ loading: false, error: true })
                console.log(err)
            })
    }, [setJWT])

    const logout = useCallback(() => {
        localStorage.removeItem('jwt')
        //window.sessionStorage.removeItem('jwt')
        setJWT(null)
    }, [setJWT])

    const addMatricula = useCallback(({asig_codigo, peri_codigo,clave}) => {

        matriculaService({ asig_codigo, peri_codigo,clave, jwt })
            .then(setMATRICULA)
            .catch(err => {
                console.log(err)
                if(err.message === "403"){

                    localStorage.removeItem('jwt')

                }
            })

    }, [jwt, setMATRICULA])

    return {
        addMatricula,
        matricula,
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout
    }

}
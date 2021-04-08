import { useCallback, useContext, useState } from 'react'
import Context from 'context/UserContext'
import loginService from 'services/login'

export default function useUser() {

    const {user, setUSER} = useContext(Context)
    const [state, setState] = useState({ loading: false, error: false })

    const login = useCallback(({ username, password }) => {
        setState({ loading: true, error: false })
        loginService({ username, password })
            .then(user => {
                window.sessionStorage.setItem('user', user)
                setState({ loading: false, error: false })
                setUSER(user)
            })
            .catch(err => {
                window.sessionStorage.removeItem('user')
                setState({ loading: false, error: true })
                console.log(err)
            })
    }, [setUSER])

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('user')
        setUSER(null)
    }, [setUSER])

    return {
        isLogged: Boolean(user),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout
    }

}
import {  useState, useEffect, useContext } from 'react'
import perfilService from 'services/perfil'
import Context from 'context/PerfilContext'
import useUser from 'hooks/useUser'

export default function usePortafolios() {

    const {perfil, setPERFIL} = useContext(Context)
    const [loading, setLoading] = useState(false)

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")
    
    const { logout } = useUser()

    useEffect(function () {
        setLoading(true)
        perfilService({jwt})
            .then(perfil => {
                setPERFIL(perfil)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err.message)
                if (err.message === '403'){
                   
                    logout()
                }

            })
    }, [jwt, logout,setPERFIL])

    

    return {
        loading,
        perfil
    }

}
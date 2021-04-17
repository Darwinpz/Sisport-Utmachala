import {  useState, useEffect, useContext } from 'react'
import perfilService from 'services/perfil'
import Context from 'context/PerfilContext'

export default function usePortafolios() {

    const {perfil, setPERFIL} = useContext(Context)
    const [loading, setLoading] = useState(false)

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")


    useEffect(function () {
        setLoading(true)
        perfilService({jwt})
            .then(perfil => {
                setPERFIL(perfil)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                //localStorage.removeItem('jwt')
                console.log(err)

            })
    }, [jwt,setPERFIL])

    

    return {
        loading,
        perfil
    }

}
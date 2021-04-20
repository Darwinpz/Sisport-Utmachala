import {  useState, useEffect, useContext } from 'react'
//import perfilService from 'services/perfil'
import usuariosServices from 'services/usuarios'
import Context from 'context/PerfilContext'

export default function usePortafolios() {

    const {perfil, setPERFIL} = useContext(Context)
    const [loading, setLoading] = useState(false)

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")

    const {miperfil} = usuariosServices({jwt})

    useEffect(function () {
        setLoading(true)
        miperfil()
            .then(perfil => {
                setPERFIL(perfil)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                if(err.message === "403"){

                    localStorage.removeItem('jwt')

                }
                //localStorage.removeItem('jwt')
                console.log(err)

            })
    }, [jwt,setPERFIL])

    

    return {
        loading,
        perfil
    }

}
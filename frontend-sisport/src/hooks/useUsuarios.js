import { useContext, useState, useEffect } from 'react'
import Context from 'context/UsuariosContext'
import usuariosService from 'services/usuarios'

export default function useCarreras({rol}) {

    const {usuarios, setUSUARIOS} = useContext(Context)
    const [loading, setLoading] = useState(false)

    const jwt = localStorage.getItem("jwt")

    useEffect(function () {
        setLoading(true)
        usuariosService({rol,jwt})
            .then(users => {
                setUSUARIOS(null)
                setUSUARIOS(users)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                //localStorage.removeItem('jwt')
                console.log(err)
            })
    }, [rol,jwt,setUSUARIOS])

    return {
        loading,
        usuarios
    }

}
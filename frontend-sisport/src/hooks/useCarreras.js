import { useContext, useState, useEffect } from 'react'
import Context from 'context/CarrerasContext'
import carreraService from 'services/carreras'
import useUser from 'hooks/useUser'

export default function useCarreras() {

    const {carreras, setCARRERAS} = useContext(Context)
    const [loading, setLoading] = useState(false)

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")
    const { logout } = useUser()

    useEffect(function () {
        setLoading(true)
        carreraService({jwt})
            .then(carr => {
                setCARRERAS(carr)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                if (err.message === '403'){

                    logout()
                }
            })
    }, [jwt,logout,setCARRERAS])

    return {
        loading,
        carreras
    }

}
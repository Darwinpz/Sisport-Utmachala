import { useContext, useState, useEffect } from 'react'
import Context from 'context/AsignaturasContext'
import asignaturasService from 'services/asignaturas'
import useUser from 'hooks/useUser'

export default function useAsignaturas({car_nombre}) {

    const {asignaturas, setASIGNATURAS} = useContext(Context)
    const [loading, setLoading] = useState(false)

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")
    const { logout } = useUser()

    useEffect(function () {
        setLoading(true)
        asignaturasService({car_nombre,jwt})
            .then(asig => {
                setASIGNATURAS(asig)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                if (err.message === '403'){

                    logout()
                }
            })
    }, [car_nombre,jwt,logout,setASIGNATURAS])

    return {
        loading,
        asignaturas
    }

}
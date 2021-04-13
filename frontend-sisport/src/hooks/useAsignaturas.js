import { useContext, useState, useEffect } from 'react'
import Context from 'context/AsignaturasContext'
import asignaturasService from 'services/asignaturas'

export default function useAsignaturas({car_nombre}) {

    const {asignaturas, setASIGNATURAS} = useContext(Context)
    const [loading, setLoading] = useState(false)

    const jwt = window.sessionStorage.getItem("jwt")

    useEffect(function () {
        setLoading(true)
        asignaturasService({car_nombre,jwt})
            .then(asig => {
                setASIGNATURAS(asig)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [car_nombre,jwt,setASIGNATURAS])

    return {
        loading,
        asignaturas
    }

}
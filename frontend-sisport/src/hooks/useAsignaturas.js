import { useContext, useState, useEffect } from 'react'
import Context from 'context/AsignaturasContext'
import asignaturasService from 'services/asignaturas'

export default function useAsignaturas({car_nombre}) {

    const {asignaturas, setASIGNATURAS} = useContext(Context)
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        asignaturasService({car_nombre})
            .then(asig => {
                setASIGNATURAS(asig)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [car_nombre,setASIGNATURAS])

    return {
        loading,
        asignaturas
    }

}
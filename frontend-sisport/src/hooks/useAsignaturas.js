import { useContext, useState, useEffect } from 'react'
import Context from 'context/AsignaturasContext'
import asignaturasService from 'services/asignaturas'

export default function useAsignaturas({car_nombre}) {

    const {asignaturas, setASIGNATURAS} = useContext(Context)
    const [loading, setLoading] = useState(false)

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")

    const {buscar} = asignaturasService({jwt})

    useEffect(function () {
        setLoading(true)
        buscar({car_nombre})
            .then(asig => {
                setASIGNATURAS(asig)
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
    }, [car_nombre,jwt,setASIGNATURAS])

    return {
        loading,
        asignaturas
    }

}
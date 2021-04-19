import { useContext, useState, useEffect } from 'react'
import Context from 'context/CarrerasContext'
import carreraService from 'services/carreras'

export default function useCarreras() {

    const {carreras, setCARRERAS} = useContext(Context)
    const [loading, setLoading] = useState(false)

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")

    useEffect(function () {
        setLoading(true)
        carreraService({jwt})
            .then(carr => {
                setCARRERAS(carr)
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
    }, [jwt,setCARRERAS])

    return {
        loading,
        carreras
    }

}
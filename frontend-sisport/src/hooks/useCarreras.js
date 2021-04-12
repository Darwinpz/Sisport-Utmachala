import { useContext, useState, useEffect } from 'react'
import Context from 'context/CarrerasContext'
import carreraService from 'services/carreras'

export default function useCarreras() {

    const {carreras, setCARRERAS} = useContext(Context)
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        carreraService()
            .then(carr => {
                setCARRERAS(carr)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [setCARRERAS])

    return {
        loading,
        carreras
    }

}
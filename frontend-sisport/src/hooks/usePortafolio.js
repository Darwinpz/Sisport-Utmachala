import {  useState, useEffect, useContext } from 'react'
import portafolioService from 'services/portafolio'
import Context from 'context/PortafolioContext'

export default function usePortafolio({asig_codigo,peri_codigo, per_codigo}) {
    
    const {portafolio, setPORTAFOLIO} = useContext(Context)
    const [loading, setLoading] = useState(false)

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")

    useEffect(function () {
        setLoading(true)
        portafolioService({asig_codigo,peri_codigo,per_codigo,jwt})
            .then(data => {
                setPORTAFOLIO(data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                //localStorage.removeItem('jwt')
                console.log(err)

            })
    }, [asig_codigo,peri_codigo,per_codigo,jwt,setPORTAFOLIO])


    return {
        loading,
        portafolio
    }

}
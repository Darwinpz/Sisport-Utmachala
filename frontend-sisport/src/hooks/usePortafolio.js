import {  useState, useEffect, useContext } from 'react'
import portafolioService from 'services/portafolio'
import Context from 'context/PortafolioContext'

export default function usePortafolio({asig_codigo,peri_codigo, per_codigo}) {
    
    const {portafolio, setPORTAFOLIO} = useContext(Context)
    const [loading, setLoading] = useState(false)

    const jwt = localStorage.getItem("jwt")

    const {encontrar} = portafolioService({jwt})

    useEffect(function () {
        setLoading(true)
        encontrar({asig_codigo,peri_codigo,per_codigo})
            .then(data => {
                setPORTAFOLIO(data)
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
    }, [asig_codigo,peri_codigo,per_codigo,jwt,setPORTAFOLIO])


    return {
        loading,
        portafolio
    }

}
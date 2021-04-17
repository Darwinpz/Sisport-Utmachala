import { useContext, useState, useEffect } from 'react'
import Context from 'context/PortafoliosContext'
import portafolioService from 'services/portafolios'


export default function usePortafolios() {

    const {portafolios, setPORTAFOLIOS} = useContext(Context)
    const [loading, setLoading] = useState(false)

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")

    useEffect(function () {
        setLoading(true)
        portafolioService({jwt})
            .then(port => {
                setPORTAFOLIOS(port)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                
               //localStorage.removeItem('jwt')
                console.log(err)

            })
    }, [jwt,setPORTAFOLIOS])

    

    return {
        loading,
        portafolios
    }

}
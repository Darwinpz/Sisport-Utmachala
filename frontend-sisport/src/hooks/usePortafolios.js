import { useContext, useState, useEffect } from 'react'
import Context from 'context/PortafoliosContext'
import portafolioService from 'services/portafolios'

import useUser from 'hooks/useUser'

export default function usePortafolios() {

    const {portafolios, setPORTAFOLIOS} = useContext(Context)
    const [loading, setLoading] = useState(false)

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")

    const { logout } = useUser()

    useEffect(function () {
        setLoading(true)
        portafolioService({jwt})
            .then(port => {
                setPORTAFOLIOS(port)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                
                if (err.message === '403'){

                    logout()
                }

            })
    }, [jwt,logout,setPORTAFOLIOS])

    

    return {
        loading,
        portafolios
    }

}
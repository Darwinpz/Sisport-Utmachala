import { useCallback, useContext, useState } from 'react'
import Context from 'context/DiariosContext'
//import diariosService from 'services/diarios'
import portafolioService from 'services/portafolio'

export default function useDIARIOS() {

    const { diarios, setDIARIOS } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({ loading: false, error: false })

    const jwt = localStorage.getItem("jwt")

    const {savediarios} = portafolioService({jwt})

    const updatediarios = useCallback(({ asig_codigo, peri_codigo, num_diario, tema, contenidos, objetivos, actividades, estrategias, resumen, preg1, preg2, preg3, preg4 }) => {
        setState({ loading: true, error: false })
        savediarios({ asig_codigo, peri_codigo, num_diario, tema, contenidos, objetivos, actividades, estrategias, resumen, preg1, preg2, preg3, preg4 })
            .then(diarios => {
                setDIARIOS(diarios)
                setLoading(false)
                setState({ loading: false, error: false })
            })
            .catch(err => {
                setLoading(false)
                setState({ loading: false, error: true })
                if (err.message === "403") {

                    localStorage.removeItem('jwt')

                }
                //localStorage.removeItem('jwt')
                console.log(err)
            })
    }, [jwt, setDIARIOS])

    return {
        loading,
        diarios,

        isDiarioLoading: state.loading,
        hasDiarioError: state.error,
        updatediarios
    }

}
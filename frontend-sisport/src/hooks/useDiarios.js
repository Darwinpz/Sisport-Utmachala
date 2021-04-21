import { useCallback, useState } from 'react'
import portafolioService from 'services/portafolio'

export default function useDIARIOS() {

    const [state, setState] = useState({ loading: false, error: false })

    const jwt = localStorage.getItem("jwt")

    const { savediarios, saveInforme, saveExpectativas } = portafolioService({ jwt })

    const updatediarios = useCallback(({ asig_codigo, peri_codigo, num_diario, tema, contenidos, objetivos, actividades, estrategias, resumen, preg1, preg2, preg3, preg4 }) => {
        setState({ loading: true, error: false })
        savediarios({ asig_codigo, peri_codigo, num_diario, tema, contenidos, objetivos, actividades, estrategias, resumen, preg1, preg2, preg3, preg4 })
            .then(() => {
                setState({ loading: false, error: false })
            })
            .catch(err => {
                setState({ loading: false, error: true })
                if (err.message === "403") {

                    localStorage.removeItem('jwt')

                }
                console.log(err)
            })
    }, [jwt])


    const updateInforme = useCallback(({ asig_codigo, peri_codigo, contenido }) => {
        setState({ loading: true, error: false })
        saveInforme({ asig_codigo, peri_codigo, contenido })
            .then(() => {
                setState({ loading: false, error: false })
            })
            .catch(err => {
                setState({ loading: false, error: true })
                if (err.message === "403") {

                    localStorage.removeItem('jwt')

                }
                //localStorage.removeItem('jwt')
                console.log(err)
            })
    }, [jwt])


    const updateExpectativas = useCallback(({ asig_codigo, peri_codigo, contenido }) => {
        setState({ loading: true, error: false })
        saveExpectativas({ asig_codigo, peri_codigo, contenido })
            .then(() => {
                setState({ loading: false, error: false })
            })
            .catch(err => {
                setState({ loading: false, error: true })
                if (err.message === "403") {

                    localStorage.removeItem('jwt')

                }
                //localStorage.removeItem('jwt')
                console.log(err)
            })
    }, [jwt])

    return {
        isLoading: state.loading,
        hasError: state.error,
        updatediarios,
        updateInforme,
        updateExpectativas
    }

}
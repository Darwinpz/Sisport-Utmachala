import { useCallback, useContext, useState } from 'react'
import Context from 'context/HorarioContext'
import horarioService from 'services/horarios'
import estructuraService from 'services/estructura'

export default function useHORARIOS() {

    const { horario, setHORARIO } = useContext(Context)
    const { estructura, setESTRUCTURA } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({ loading: false, error: false })

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")

    const addHorario = useCallback(({arreglo, asig_codigo, peri_codigo }) => {
        setState({ loading: true, error: false })
        horarioService({ arreglo,asig_codigo, peri_codigo, jwt })
            .then(horario => {
                setHORARIO(horario)
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
    }, [jwt, setHORARIO])

    const addEstructura = useCallback(({ asig_codigo, peri_codigo, clave  }) => {
        setState({ loading: true, error: false })
        estructuraService({  asig_codigo, peri_codigo, clave , jwt })
            .then(estru => {
                setESTRUCTURA(estru)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                if (err.message === "403") {

                    localStorage.removeItem('jwt')

                }
                //localStorage.removeItem('jwt')
                console.log(err)
            })
    }, [jwt, setESTRUCTURA])

    return {
        loading,
        horario,
        estructura,
        isDiarioLoading: state.loading,
        hasDiarioError: state.error,
        addHorario,
        addEstructura
    }

}
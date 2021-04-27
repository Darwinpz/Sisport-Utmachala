import {  useState, useEffect, useContext } from 'react'
import matriculadosService from 'services/matriculados'
import Context from 'context/MatriculadosContext'

export default function useMatriculados({asig_codigo,peri_codigo,sem_codigo}) {
    
    const {matriculados, setMATRICULADOS} = useContext(Context)
    const [loading, setLoading] = useState(false)

    //const jwt = window.sessionStorage.getItem("jwt")
    const jwt = localStorage.getItem("jwt")

    useEffect(function () {
        setLoading(true)
        matriculadosService({asig_codigo,peri_codigo,sem_codigo,jwt})
            .then(data => {
                setMATRICULADOS(data)
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
    }, [asig_codigo,peri_codigo,sem_codigo,jwt,setMATRICULADOS])


    return {
        loading,
        matriculados
    }

}
const ENDPOINT = process.env.REACT_APP_SERVER_PYTHON

export default function Archivos({}) {
    
    const descargarArchivo = async ({fac_abreviatura, car_abreviatura, asig_abreviatura,per_cedula,tipo_archivo,nombre_archivo}) => {

        return fetch(ENDPOINT+"/download/archivo", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            },
            body: JSON.stringify({fac_abreviatura, car_abreviatura, asig_abreviatura,per_cedula,tipo_archivo,nombre_archivo})
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })

        
    }

    const eliminarArchivo = async ({fac_abreviatura, car_abreviatura, asig_abreviatura,per_cedula,tipo_archivo,nombre_archivo}) => {
        
        return fetch(ENDPOINT+"/delete/archivo", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            },
            body: JSON.stringify({fac_abreviatura, car_abreviatura, asig_abreviatura,per_cedula,tipo_archivo,nombre_archivo})
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })


    }

    return {
        descargarArchivo,
        eliminarArchivo
    }
    

}
const ENDPOINT = process.env.REACT_APP_SERVER_PYTHON+'/download/archivo'

export default function Descargas({fac_abreviatura, car_abreviatura, asig_abreviatura,per_cedula,tipo_archivo,nombre_archivo}) {
    

    return fetch(ENDPOINT, {
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
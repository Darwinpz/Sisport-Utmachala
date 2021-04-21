const ENDPOINT = process.env.REACT_APP_SERVER_PYTHON+'/create/asignatura'

export default function Asignatura({fac_nombre, car_nombre, asig_identificador}) {

    return fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true
        },
        body: JSON.stringify({fac_nombre, car_nombre, asig_identificador})
    }).then(res => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
    }).then(res => {
        const { message } = res
        return message
    })


}
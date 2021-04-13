const ENDPOINT = process.env.REACT_APP_SERVER+'/api/asignatura/buscar'

export default function Asignaturas({car_nombre,jwt}) {

    return fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
            'Authorization': "Bearer "+jwt
        },
        body: JSON.stringify({car_nombre})
    }).then(res => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
    }).then(res => {
        const { message } = res
        return message
    })


}
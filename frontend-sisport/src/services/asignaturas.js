const ENDPOINT = 'http://190.155.140.58/api/asignatura/buscar'

export default function Asignaturas({car_nombre}) {

    return fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true
        },
        body: JSON.stringify({car_nombre})
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        console.log(res)
        const { message } = res
        return message
    })


}
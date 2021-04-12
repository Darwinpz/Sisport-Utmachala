const ENDPOINT = 'http://localhost/api/carrerasandfacultad'

export default function Carreras() {

    return fetch(ENDPOINT, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true
        }
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        console.log(res)
        const { message } = res
        return message
    })


}
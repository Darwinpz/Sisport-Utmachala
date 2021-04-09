const ENDPOINT = 'http://localhost/api/persona'

export default function login({ username, password }) {

    return fetch(`${ENDPOINT}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true
        },
        body: JSON.stringify({per_cedula: username, per_clave : password})
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        console.log(res)
        const { message } = res
        return message
    })


}
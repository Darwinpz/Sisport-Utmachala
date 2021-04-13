const ENDPOINT = 'http://190.155.140.58/api/persona'

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
        if (!res.ok) throw new Error(res.status)
        return res.json()
    }).then(res => {
        console.log(res)
        const { token } = res
        return token
    })


}
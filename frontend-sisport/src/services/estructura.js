const ENDPOINT = process.env.REACT_APP_SERVER+'/api/estructura/add'

export default function Horario({asig_codigo, peri_codigo, clave,jwt}) {

    return fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
            'Authorization': "Bearer "+jwt
        },
        body: JSON.stringify({asig_codigo, peri_codigo, clave})
    }).then(res => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
    }).then(res => {
        const { message } = res
        return message
    })


}
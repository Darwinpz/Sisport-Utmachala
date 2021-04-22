const ENDPOINT = process.env.REACT_APP_SERVER+'/api/persona_asignatura/matriculados'

export default function Matriculados({asig_codigo, peri_codigo,sem_codigo,jwt}) {

    return fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
            'Authorization': "Bearer "+jwt
        },
        body: JSON.stringify({asig_codigo, peri_codigo,sem_codigo})
    }).then(res => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
    }).then(res => {
        const { message } = res
        return message
    })


}
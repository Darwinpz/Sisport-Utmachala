const ENDPOINT = process.env.REACT_APP_SERVER+'/api/horario/add'

export default function Horario({arreglo,asig_codigo, peri_codigo,jwt}) {

    return fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
            'Authorization': "Bearer "+jwt
        },
        body: JSON.stringify({arreglo,asig_codigo, peri_codigo})
    }).then(res => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
    }).then(res => {
        const { message } = res
        return message
    })


}
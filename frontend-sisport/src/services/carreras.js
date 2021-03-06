const ENDPOINT = process.env.REACT_APP_SERVER+'/api/carrerasandfacultad'

export default function Carreras({ jwt }) {

    return fetch(ENDPOINT, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
            'Authorization': 'Bearer ' + jwt
        }
    }).then(res => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
    }).then(res => {
        const { message } = res
        return message
    })


}
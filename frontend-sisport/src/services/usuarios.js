
const ENDPOINT = process.env.REACT_APP_SERVER+"/api/persona"

export default function Usuarios({jwt}) {

     const usuarios = async({rol})=>{

        return fetch(ENDPOINT+'/rol', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer "+jwt
            },
            body: JSON.stringify({rol})
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })

    }

    const miperfil = async()=>{

        return fetch(ENDPOINT+'/perfil', {
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

    const iniciarSesion = async({username,password})=>{

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

    return {
        usuarios,
        miperfil,
        iniciarSesion
    }

}
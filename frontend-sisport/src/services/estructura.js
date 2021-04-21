const ENDPOINT = process.env.REACT_APP_SERVER+'/api/estructura'

export default function Estructura({jwt}) {

    const addEstructura = async ({ asig_codigo, peri_codigo, clave }) => {

        return fetch(ENDPOINT+"/add", {
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

    const removeEstructura = async ({ asig_codigo, peri_codigo }) => {

        return fetch(ENDPOINT+"/remove", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer "+jwt
            },
            body: JSON.stringify({asig_codigo, peri_codigo})
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })

    }
   
    return{
        addEstructura,
        removeEstructura
    }

}
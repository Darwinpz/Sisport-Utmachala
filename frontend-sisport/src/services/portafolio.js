const ENDPOINT = process.env.REACT_APP_SERVER + '/api/portafolio'

export default function Portafolio({ jwt }) {

    const encontrar = async ({ asig_codigo, peri_codigo, per_codigo }) => {

        return fetch(ENDPOINT+"/find", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({ asig_codigo, peri_codigo, per_codigo })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })

    }

    const savediarios = async ({ asig_codigo, peri_codigo, num_diario, tema, contenidos, objetivos, actividades, estrategias, resumen, preg1, preg2, preg3, preg4 }) => {

        return fetch(ENDPOINT+"/diario", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({ asig_codigo, peri_codigo, num_diario, tema, contenidos, objetivos, actividades, estrategias, resumen, preg1, preg2, preg3, preg4 })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })

    }

    return {

        encontrar,
        savediarios

    }

}
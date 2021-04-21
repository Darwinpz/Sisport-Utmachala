const ENDPOINT = process.env.REACT_APP_SERVER_PYTHON + "/generate"

export default function Generar() {


    const generarDiario = async ({ fac_abreviatura, car_abreviatura, asig_abreviatura, per_cedula }) => {

        return fetch(ENDPOINT + "/diario", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            },
            body: JSON.stringify({ fac_abreviatura, car_abreviatura, asig_abreviatura, per_cedula })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })


    }

    const generarInforme = async ({ fac_abreviatura, car_abreviatura, asig_abreviatura, per_cedula }) => {

        return fetch(ENDPOINT + "/informe", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            },
            body: JSON.stringify({ fac_abreviatura, car_abreviatura, asig_abreviatura, per_cedula })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })


    }

    const generarExpectativas = async ({ fac_abreviatura, car_abreviatura, asig_abreviatura, per_cedula }) => {

        return fetch(ENDPOINT + "/expectativas", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            },
            body: JSON.stringify({ fac_abreviatura, car_abreviatura, asig_abreviatura, per_cedula })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })


    }

    return {
        generarDiario,
        generarInforme,
        generarExpectativas
    }

}
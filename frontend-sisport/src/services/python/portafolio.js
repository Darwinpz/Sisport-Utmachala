const ENDPOINT = process.env.REACT_APP_SERVER_PYTHON

export default function Portafolio() {

    const crearPortafolio = async ({ fac_nombre, car_nombre, asig_identificador, per_cedula }) => {

        return fetch(ENDPOINT + "/create/portafolio", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            },
            body: JSON.stringify({ fac_nombre, car_nombre, asig_identificador, per_cedula })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })


    }

    const downloadPortafolio = async ({ fac_abreviatura, car_abreviatura, asig_abreviatura, per_cedula }) => {

        return fetch(ENDPOINT + "/download/portafolio", {
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


    const removePortafolio = async ({ fac_nombre, car_nombre, asig_identificador }) => {

        return fetch(ENDPOINT + "/delete/portafolio", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            },
            body: JSON.stringify({ fac_nombre, car_nombre, asig_identificador})
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })


    }


    return {
        crearPortafolio,
        downloadPortafolio,
        removePortafolio
    }


}
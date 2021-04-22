const ENDPOINT = process.env.REACT_APP_SERVER + '/api/asignatura'

export default function Asignaturas({ jwt }) {


    const buscar = async ({ car_nombre }) => {

        return fetch(ENDPOINT + "/buscar", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({ car_nombre })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })

    }

    const all = async () => {

        return fetch(ENDPOINT, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            }
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })

    }



    const add = async ({ asig_nombre, sem_codigo, asig_identificador }) => {

        return fetch(ENDPOINT + "/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({ asig_nombre, sem_codigo, asig_identificador })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })

    }

    const add_estado = async ({ asig_est_asig_codigo, asig_est_peri_codigo, asig_est_estado }) => {

        return fetch(ENDPOINT + "/addestado", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({ asig_est_asig_codigo, asig_est_peri_codigo, asig_est_estado })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })

    }


    


    return {
        buscar,
        all,
        add,
        add_estado

    }

}
const ENDPOINT = process.env.REACT_APP_SERVER + '/api/semestre'

export default function Semestres({ jwt }) {


    const all = async ({}) => {

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


    const add = async ({sem_nombre, sem_paralelo, car_codigo}) => {

        return fetch(ENDPOINT+"/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({sem_nombre, sem_paralelo, car_codigo})
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res

            return message
        })

    }

    return{

        all,
        add

    }


}
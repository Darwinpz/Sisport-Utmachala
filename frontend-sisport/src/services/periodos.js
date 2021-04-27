const ENDPOINT = process.env.REACT_APP_SERVER + '/api/periodo'

export default function Periodos({ jwt }) {


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

    const add = async ({peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo, peri_estado}) => {

        return fetch(ENDPOINT+"/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo, peri_estado})
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res

            return message
        })

    }


    const update = async ({peri_codigo, peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo, peri_estado}) => {

        return fetch(ENDPOINT+"/put", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({peri_codigo, peri_nombre, peri_fecha_inicial, peri_fecha_final, sem_codigo, peri_estado})
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res

            return message
        })

    }


    const remove = async ({peri_codigo}) => {

        return fetch(ENDPOINT+"/delete", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({peri_codigo})
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
        add,
        update,
        remove

    }


}
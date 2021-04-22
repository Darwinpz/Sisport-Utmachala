
const ENDPOINT = process.env.REACT_APP_SERVER + '/api/persona_asignatura'

export default function PersonaAsignaturas({ jwt }) {


    const add_perasig = async ({ per_codigo, asig_codigo, peri_codigo }) => {

        return fetch(ENDPOINT + "/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({ per_codigo, asig_codigo, peri_codigo })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })

    }


    return{


        add_perasig

    }


}
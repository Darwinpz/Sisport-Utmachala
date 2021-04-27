
const ENDPOINT = process.env.REACT_APP_SERVER + "/api/persona"

export default function Usuarios({ jwt }) {

    const usuarios = async ({ rol }) => {

        return fetch(ENDPOINT + '/rol', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({ rol })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            const { message } = res
            return message
        })

    }

    const miperfil = async () => {

        return fetch(ENDPOINT + '/perfil', {
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

    const iniciarSesion = async ({ username, password }) => {

        return fetch(`${ENDPOINT}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            },
            body: JSON.stringify({ per_cedula: username, per_clave: password })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            console.log(res)
            const { token } = res
            return token
        })

    }


    const add = async ({ per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento,
        per_edad, per_correo, per_facebook, per_direccion, per_pais, per_provincia, per_ciudad,
        per_sexo, per_estado_civil, per_telef_fijo, per_telef_celular }) => {

        return fetch(`${ENDPOINT}/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({
                per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento,
                per_edad, per_correo, per_facebook, per_direccion, per_pais, per_provincia, per_ciudad,
                per_sexo, per_estado_civil, per_telef_fijo, per_telef_celular
            })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            console.log(res)
            const { token } = res
            return token
        })

    }


    const update = async ({ per_codigo, per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento, per_correo,
        per_facebook, per_direccion, per_pais, per_provincia, per_ciudad, per_sexo, per_estado_civil, per_telef_fijo,
        per_telef_celular }) => {

        return fetch(`${ENDPOINT}/put`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({
                per_codigo, per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento, per_correo,
                per_facebook, per_direccion, per_pais, per_provincia, per_ciudad, per_sexo, per_estado_civil, per_telef_fijo,
                per_telef_celular
            })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            console.log(res)
            const { token } = res
            return token
        })

    }


    const remove = async ({ per_codigo }) => {

        return fetch(`${ENDPOINT}/delete`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({ per_codigo })
        }).then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        }).then(res => {
            console.log(res)
            const { token } = res
            return token
        })

    }


    const changepassword = async ({ per_codigo, per_clave }) => {

        return fetch(`${ENDPOINT}/updatepassword`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({ per_codigo, per_clave })
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
        iniciarSesion,
        add,
        update,
        remove,
        changepassword
    }

}
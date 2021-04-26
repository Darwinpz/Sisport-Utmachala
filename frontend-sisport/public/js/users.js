$('#usuarios').on('show.bs.modal', function (event) {


    var button = $(event.relatedTarget)

    var per_codigo = button.data('per_codigo')

    var modal = $(this)

    var err = document.getElementsByTagName("strong")[0]

    if (err) {
        err.innerText = ""
    }

    var per_tipo = button.data('per_tipo')

    modal.find('.modal-title').text('CREAR ' + per_tipo)

    document.getElementById("btn_editar_usuario").hidden = true
    document.getElementById("btn_guardar_usuario").hidden = false

    document.getElementById("per_tipo").innerText = per_tipo

    if (per_tipo == "ESTUDIANTE") {

        document.getElementById("per_titulo").hidden = true
        document.getElementById("abreviatura_titulo").hidden = true


    } else {

        document.getElementById("per_titulo").hidden = false
        document.getElementById("abreviatura_titulo").hidden = false

    }

    if (per_codigo) {

        document.getElementById("per_codigo").innerText = per_codigo
        document.getElementById("btn_editar_usuario").hidden = false
        document.getElementById("btn_guardar_usuario").hidden = true

        modal.find('.modal-title').text('EDITAR ' + per_tipo)

        const jwt = localStorage.getItem("jwt")


        $.ajax({

            url: 'http://190.155.140.58/api/persona/find',
            data: { per_codigo },
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
            type: "POST",
            success: function (data) {

                const contenido = data.message

                document.getElementById("per_cedula").value = contenido.per_cedula
                document.getElementById("per_correo").value = contenido.per_correo
                document.getElementById("per_nombre").value = contenido.per_nombre
                document.getElementById("per_apellido").value = contenido.per_apellido

                if (contenido.per_sexo) {
                    document.getElementById("per_sexo").value = contenido.per_sexo
                } else {
                    document.getElementById("per_sexo").value = ""

                }
                document.getElementById("fecha_nacimiento").value = contenido.per_fecha_nacimiento.split("T")[0]
                document.getElementById("per_titulo").value = contenido.per_titulo
                document.getElementById("per_pais").value = contenido.per_pais
                document.getElementById("per_provincia").value = contenido.per_provincia
                document.getElementById("per_ciudad").value = contenido.per_ciudad
                document.getElementById("per_direccion").value = contenido.per_direccion
                document.getElementById("per_telef_fijo").value = contenido.per_telef_fijo
                document.getElementById("per_telef_celular").value = contenido.per_telef_celular

            }
            ,
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(errorThrown)
                console.log(jqXHR)
                console.log(textStatus)
            }

        })

    } else {

        document.getElementById("per_cedula").value = ""
        document.getElementById("per_correo").value = ""
        document.getElementById("per_nombre").value = ""
        document.getElementById("per_apellido").value = ""
        document.getElementById("per_sexo").value = ""
        document.getElementById("fecha_nacimiento").value = ""
        document.getElementById("per_titulo").value = ""
        document.getElementById("per_pais").value = ""
        document.getElementById("per_provincia").value = ""
        document.getElementById("per_ciudad").value = ""
        document.getElementById("per_direccion").value = ""
        document.getElementById("per_telef_fijo").value = ""
        document.getElementById("per_telef_celular").value = ""
        document.getElementById("per_codigo").innerText = ""


    }


})

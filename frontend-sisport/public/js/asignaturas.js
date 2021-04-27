
$('#asignaturas').on('show.bs.modal', function (event) {

    const jwt = localStorage.getItem("jwt")

    document.getElementById("asig_identificador").value = ""
    document.getElementById("asig_nombre").value = ""
    document.getElementById("fac_codigo").innerHTML = "<option selected disabled value=''>Selecciona la Facultad...</option>"
    document.getElementById("car_codigo").innerHTML = "<option selected disabled value=''>Selecciona la Carrera...</option>"
    document.getElementById("peri_codigo").innerHTML = "<option selected disabled value=''>Selecciona un Periodo...</option>"
    document.getElementById("sem_codigo").innerHTML = "<option selected disabled value=''>Selecciona el Semestre...</option>"
    document.getElementById("docente_codigo").innerHTML = "<option selected disabled value=''>Selecciona el Docente...</option>"

    var err = document.getElementsByTagName("strong")[0]

    if(err){
        err.innerText = ""
    }

    
    document.getElementById("btn_editar_asignatura").hidden = true
    document.getElementById("btn_guardar_asignatura").hidden = false

    $.ajax({

        url: 'http://190.155.140.58/api/facultad/',
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        type: "GET",
        success: function (data) {

            const facultades = data.message

            facultades.forEach(facultad => {

                var option = document.createElement("option");
                option.text = facultad.fac_nombre
                option.value = facultad.fac_codigo;

                document.getElementById("fac_codigo").add(option)

            })


        }
        ,
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown)
            console.log(jqXHR)
            console.log(textStatus)
        }

    })


    $("#fac_codigo").on("change", (e) => {

        if (e.target.value) {

            const fac_codigo = e.target.value

            obtener_carreras(fac_codigo, jwt, null)

        }


    })


    $.ajax({

        url: 'http://190.155.140.58/api/periodo/',
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        type: "GET",
        success: function (data) {

            const periodos = data.message

            var select = document.getElementById("peri_codigo")

            periodos.forEach(periodo => {

                var option = document.createElement("option");
                option.text = periodo.peri_nombre
                option.value = periodo.peri_codigo;

                select.add(option)

            })


        }
        ,
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown)
            console.log(jqXHR)
            console.log(textStatus)
        }

    })



    $("#fac_codigo, #car_codigo, #peri_codigo").on("change", (e) => {

        if (e.target.value) {

            const peri_codigo = document.getElementById("peri_codigo").value

            const car_codigo = document.getElementById("car_codigo").value

            obtener_semestres(peri_codigo, car_codigo, jwt, null)


        }


    })



    $("#sem_codigo").on("change", (e) => {

        if (e.target.value) {

            obtener_docentes(jwt, null)

        }


    })

    var button = $(event.relatedTarget)

    var asig_codigo = button.data('asig_codigo')

    var modal = $(this)

    if (asig_codigo) {

        modal.find('.modal-title').text('EDITAR ASIGNATURA')
        document.getElementById("btn_editar_asignatura").hidden = false
        document.getElementById("btn_guardar_asignatura").hidden = true

        $.ajax({

            url: 'http://190.155.140.58/api/asignatura/find',
            data: { asig_codigo },
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
            type: "POST",
            success: function (data) {

                const contenido = data.message

                document.getElementById("asig_identificador").value = contenido.asig_identificador
                document.getElementById("asig_nombre").value = contenido.asig_nombre
                document.getElementById("fac_codigo").value = contenido.fac_codigo

                obtener_carreras(contenido.fac_codigo, jwt, contenido.car_codigo)

                document.getElementById("peri_codigo").value = contenido.peri_codigo

                obtener_semestres(contenido.peri_codigo,contenido.car_codigo,jwt,contenido.sem_codigo)

                obtener_docentes(jwt,contenido.docente)

                document.getElementById("asig_codigo").innerText = asig_codigo


            }
            ,
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(errorThrown)
                console.log(jqXHR)
                console.log(textStatus)
            }

        })

    }



})


function obtener_carreras(fac_codigo, jwt, seleccionado) {

    $.ajax({

        url: 'http://190.155.140.58/api/carrera/findfacultad',
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        type: "POST",
        data: { fac_codigo },
        success: function (data) {

            const carreras = data.message

            var select = document.getElementById("car_codigo")

            select.innerHTML = "<option selected disabled value=''>Selecciona la Carrera...</option>"

            carreras.forEach(carrera => {

                var option = document.createElement("option");
                option.text = carrera.car_nombre
                option.value = carrera.car_codigo;

                select.add(option)

            })

            if(seleccionado){
                document.getElementById("car_codigo").value = seleccionado
            }
            

        }
        ,
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown)
            console.log(jqXHR)
            console.log(textStatus)
        }

    })

}

function obtener_docentes(jwt, seleccionado) {
    $.ajax({

        url: 'http://190.155.140.58/api/persona/rol',
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        type: "POST",
        data: { rol: "DOCENTE" },

        success: function (data) {

            const docentes = data.message

            var select = document.getElementById("docente_codigo")

            select.innerHTML = "<option selected disabled value=''>Selecciona el Docente...</option>"

            docentes.forEach(docente => {

                var option = document.createElement("option");
                option.text = docente.per_titulo + " " + docente.per_nombre + " " + docente.per_apellido
                option.value = docente.per_codigo;

                select.add(option)

            })

            if(seleccionado){
                document.getElementById("docente_codigo").value = seleccionado
            }

        }
        ,
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown)
            console.log(jqXHR)
            console.log(textStatus)
        }

    })
}

function obtener_semestres(peri_codigo, car_codigo, jwt, seleccionado) {
    $.ajax({

        url: 'http://190.155.140.58/api/semestre/findperiodocarrera',
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        type: "POST",
        data: { peri_codigo, car_codigo },
        success: function (data) {

            const semestres = data.message

            var select = document.getElementById("sem_codigo")

            select.innerHTML = "<option selected disabled value=''>Selecciona el Semestre...</option>"

            semestres.forEach(semestre => {

                var option = document.createElement("option");
                option.text = semestre.sem_nombre + " " + semestre.sem_paralelo
                option.value = semestre.sem_codigo;

                select.add(option)

            })

            if(seleccionado){
                document.getElementById("sem_codigo").value = seleccionado
            }


        }
        ,
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown)
            console.log(jqXHR)
            console.log(textStatus)
        }

    })
}
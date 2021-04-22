
$('#asignaturas').on('show.bs.modal', function () {

    const jwt = localStorage.getItem("jwt")

    document.getElementById("fac_codigo").innerHTML = "<option selected disabled value=''>Selecciona la Facultad...</option>"
    document.getElementById("car_codigo").innerHTML = "<option selected disabled value=''>Selecciona la Carrera...</option>"
    document.getElementById("peri_codigo").innerHTML = "<option selected disabled value=''>Selecciona un Periodo...</option>"
    document.getElementById("sem_codigo").innerHTML = "<option selected disabled value=''>Selecciona el Semestre...</option>"
    document.getElementById("docente_codigo").innerHTML = "<option selected disabled value=''>Selecciona el Docente...</option>"

    

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

            $.ajax({

                url: 'http://190.155.140.58/api/carrera/',
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                type: "GET",
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



    $("#peri_codigo").on("change", (e) => {

        if (e.target.value) {

            $.ajax({

                url: 'http://190.155.140.58/api/semestre/',
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                type: "GET",
                success: function (data) {

                    const semestres = data.message

                    var select = document.getElementById("sem_codigo")

                    select.innerHTML = "<option selected disabled value=''>Selecciona el Semestre...</option>"

                    semestres.forEach(semestre => {

                        console.log(semestre)
                        var option = document.createElement("option");
                        option.text = semestre.sem_nombre +" " +semestre.sem_paralelo
                        option.value = semestre.sem_codigo;

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


        }


    })



    $("#sem_codigo").on("change", (e) => {

        if (e.target.value) {

            $.ajax({

                url: 'http://190.155.140.58/api/persona/rol',
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                type: "POST",
                data:{rol:"DOCENTE"},

                success: function (data) {

                    const docentes = data.message

                    var select = document.getElementById("docente_codigo")

                    select.innerHTML = "<option selected disabled value=''>Selecciona el Docente...</option>"

                    docentes.forEach(docente => {

                        var option = document.createElement("option");
                        option.text = docente.per_titulo+" "+docente.per_nombre +" " +docente.per_apellido
                        option.value = docente.per_codigo;

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


        }


    })


})

$('#semestre').on('show.bs.modal', function (event) {

    const jwt = localStorage.getItem("jwt")

    document.getElementById("fac_codigo").innerHTML = "<option selected disabled value=''>Selecciona la Facultad...</option>"
    document.getElementById("car_codigo").innerHTML = "<option selected disabled value=''>Selecciona la Carrera...</option>"
    document.getElementById("peri_codigo").innerHTML = "<option selected disabled value=''>Selecciona un Periodo...</option>"


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


    var button = $(event.relatedTarget)

    var sem_codigo = button.data('sem_codigo')

    var modal = $(this)

    if (sem_codigo) {

        modal.find('.modal-title').text('EDITAR SEMESTRE')

        $.ajax({

            url: 'http://190.155.140.58/api/semestre/find',
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
            type: "POST",
            data: { sem_codigo: sem_codigo },
            success: function (data) {

                const contenido = data.message

                console.log(contenido)
                document.getElementById("sem_nombre").value = contenido.sem_nombre
                document.getElementById("sem_paralelo").value = contenido.sem_paralelo
                document.getElementById("fac_codigo").value = contenido.fac_codigo
                document.getElementById("car_codigo").value = contenido.car_codigo
                //document.getElementById("peri_codigo").value = contenido.peri_codigo

            }
            ,
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(errorThrown)
                console.log(jqXHR)
                console.log(textStatus)
            }

        })

    } else {

        modal.find('.modal-title').text('CREAR SEMESTRE')
        document.getElementById("sem_nombre").value = ""
        document.getElementById("sem_paralelo").value = ""
        document.getElementById("fac_codigo").value = ""
        document.getElementById("car_codigo").value = ""
        //document.getElementById("peri_codigo").value = ""

    }


    $("#fac_codigo").on("change", (e) => {

        if (e.target.value) {

            const fac_codigo = e.target.value

            $.ajax({

                url: 'http://190.155.140.58/api/carrera/findfacultad',
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                type: "POST",
                data:{fac_codigo:fac_codigo},
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

})
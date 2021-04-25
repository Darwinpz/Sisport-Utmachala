
$('#semestre').on('show.bs.modal', function () {

    const jwt = localStorage.getItem("jwt")

    var err = document.getElementsByTagName("strong")[0]

    if (err) {
        err.innerText = ""
    }

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


    $("#fac_codigo").on("change  ", (e) => {

        if (e.target.value) {

            const fac_codigo = e.target.value

            $.ajax({

                url: 'http://190.155.140.58/api/carrera/findfacultad',
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                type: "POST",
                data: { fac_codigo: fac_codigo },
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


    $("#fac_codigo, #car_codigo, #sem_nombre, #peri_codigo").on("change", (e) => {

        if (e.target.value) {

            const sem_nombre = document.getElementById("sem_nombre").value

            if (sem_nombre != "") {

                const car_codigo = document.getElementById("car_codigo").value
                const peri_codigo = document.getElementById("peri_codigo").value

                document.getElementById("sem_paralelo").innerHTML =
                    ("<option value=''>Selecciona un Paralelo...</option>" +
                        "<option value='A'>PARALELO A</option>" +
                        "<option value='B'>PARALELO B</option>" +
                        "<option value='C'>PARALELO C</option>" +
                        "<option value='D'>PARALELO D</option>"
                    )

                $.ajax({

                    url: 'http://190.155.140.58/api/semestre/findparalelos',
                    headers: {
                        'Authorization': 'Bearer ' + jwt
                    },
                    type: "POST",
                    data: { sem_nombre, car_codigo, peri_codigo },
                    success: function (data) {

                        const semestres = data.message

                        console.log(semestres)

                        semestres.forEach(semestre => {

                            $("#sem_paralelo option[value='" + semestre.sem_paralelo + "']").remove();

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


        }


    })



})

$('#periodo').on('show.bs.modal', function () {

    const jwt = localStorage.getItem("jwt")

    document.getElementById("fac_codigo").innerHTML = "<option selected disabled value=''>Selecciona la Facultad...</option>"
    document.getElementById("car_codigo").innerHTML = "<option selected disabled value=''>Selecciona la Carrera...</option>"
    document.getElementById("sem_codigo").innerHTML = "<option selected disabled value=''>Selecciona el Semestre...</option>"

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


    $("#car_codigo").on("change", (e) => {

        if (e.target.value) {

            $.ajax({

                url: 'http://190.155.140.58/api/semestre/',
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                type: "GET",
                success: function (data) {

                    const carreras = data.message

                    var select = document.getElementById("sem_codigo")

                    select.innerHTML = "<option selected disabled value=''>Selecciona el Semestre...</option>"

                    carreras.forEach(sem => {

                        var option = document.createElement("option");
                        option.text = sem.sem_nombre + " "+ sem.sem_paralelo
                        option.value = sem.sem_codigo;

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
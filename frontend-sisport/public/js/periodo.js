
$('#periodo').on('show.bs.modal', function (event) {

    var button = $(event.relatedTarget)

    var periodo = button.data('periodo')

    var modal = $(this)

    var err = document.getElementsByTagName("strong")[0]

    if(err){
        err.innerText = ""
    }

    if (periodo) {

        modal.find('.modal-title').text('EDITAR PERIODO')

        document.getElementById("btn_editar_periodo").hidden = false
        document.getElementById("btn_guardar_periodo").hidden = true

        const jwt = localStorage.getItem("jwt")

        $.ajax({

            url: 'http://190.155.140.58/api/periodo/find',
            data: { peri_codigo: periodo },
            headers: {
                'Authorization': 'Bearer ' + jwt
            },
            type: "POST",
            success: function (data) {

                const contenido = data.message

                document.getElementById("peri_nombre").value = contenido.peri_nombre
                document.getElementById("fecha_inicio").value = contenido.peri_fecha_inicial.split("T")[0]
                document.getElementById("fecha_fin").value = contenido.peri_fecha_final.split("T")[0]
                document.getElementById("peri_estado").value = contenido.peri_estado
                document.getElementById("peri_codigo").innerText = periodo

            }
            ,
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(errorThrown)
                console.log(jqXHR)
                console.log(textStatus)
            }

        })

    } else {

        modal.find('.modal-title').text('CREAR PERIODO')
        document.getElementById("peri_nombre").value = ""
        document.getElementById("fecha_inicio").value = ""
        document.getElementById("fecha_fin").value = ""
        document.getElementById("peri_estado").value = ""
        document.getElementById("peri_codigo").value = ""
        document.getElementById("btn_editar_periodo").hidden = true
        document.getElementById("btn_guardar_periodo").hidden = false
    }


})




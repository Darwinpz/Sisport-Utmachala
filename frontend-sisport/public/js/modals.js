
var myDropzone = new Dropzone("#myDropzone", {
    url: "/",
    autoProcessQueue: false,
    addRemoveLinks: true,

    init: function () {

        var boton_guardar = document.querySelector("#btn_guardar");

        myDropzone = this;

        boton_guardar.addEventListener("click", function () {

            myDropzone.processQueue();

        });

        this.on('error', function (file, response) {

            $(file.previewElement).find('.dz-error-message').text(response);

        });

        this.on('sending', function (file, xhr, formData) {

            var esquema = document.getElementById("esquema").innerText
            var identificador = document.getElementById("identificador").innerText
            var periodo = document.getElementById("peri_codigo").innerText
            var cedula = document.getElementById("per_cedula").innerText
            var sem_codigo = document.getElementById("sem_codigo").innerText

            formData.append("fac_nombre", esquema.split(".")[0]);
            formData.append("car_nombre", esquema.split(".")[1]);
            formData.append("asig_identificador", identificador + "-" + periodo + "-" + sem_codigo);
            formData.append("per_cedula", cedula);


        });

        const jwt = localStorage.getItem("jwt")

        this.on("success", function (file, response) {

            const asig_codigo = document.getElementById("asig_codigo").innerText
            const peri_codigo = document.getElementById("peri_codigo").innerText

            const { tipo } = response.message

            $.ajax({

                url: "http://190.155.140.58/api/portafolio/uploadfiles",
                data: {
                    "asig_codigo": asig_codigo,
                    "peri_codigo": peri_codigo,
                    "tipo": tipo,
                    "nombre_archivo": file.name
                },
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                type: "POST",
                success: function () {

                    window.location.reload()

                }
                ,
                error: (jqXHR, textStatus, errorThrown) => {
                    console.log(errorThrown)
                    console.log(jqXHR)
                    console.log(textStatus)
                }

            })


        })

    }

});





$('#subir').on('show.bs.modal', function (event) {

    myDropzone.removeAllFiles();

    var button = $(event.relatedTarget)
    var titulo = button.data('titulo')
    var cantidad = button.data('cant')
    var size = button.data('size')
    var type = button.data('type')
    var tipo = button.data('tipo')
    var modal = $(this)

    modal.find('.modal-title').text('SUBIR ' + titulo)

    if (cantidad > 1) {

        modal.find('.modal-cant').text('Cantidad max: ' + cantidad + ' archivos simultáneos')

    } else {

        modal.find('.modal-cant').text('Cantidad max: ' + cantidad + ' archivo simultáneo')

    }


    modal.find('.modal-size').text('Tamaño max: ' + size + ' mb')
    modal.find('.modal-type').text('Formato: "' + type + '"')

    myDropzone.options.url = "http://190.155.140.58:4555/upload/" + tipo;
    myDropzone.options.maxFiles = cantidad;
    myDropzone.options.maxFilesize = size;
    myDropzone.options.acceptedFiles = type;
    myDropzone.hiddenFileInput.accept = type;
    myDropzone.options.paramName = "file";
    myDropzone.options.parallelUploads = cantidad;


})


$('#diario').on('show.bs.modal', function (event) {

    var button = $(event.relatedTarget)
    var numero = button.data('numero')
    var horas = button.data('horas')
    var fecha = button.data('fecha')
    var inicio = button.data('inicio')

    var fin = button.data('fin')
    var modal = $(this)

    modal.find('.modal-title').text('DIARIO METACOGNITIVO ' + numero)

    var nombre = document.getElementById("asignatura_nombre")

    modal.find('.modal-materia').text(nombre.innerText + " - " + horas)
    modal.find('.modal-fecha').text(fecha)

    modal.find('.modal-periodo').text(inicio.split("T")[0] + " al " + fin.split("T")[0])

    modal.find('.modal-diario').text(numero)

    const jwt = localStorage.getItem("jwt")
    const asig_codigo = document.getElementById("asig_codigo").innerText
    const peri_codigo = document.getElementById("peri_codigo").innerText
    const per_tipo = document.getElementById("per_tipo").innerText

    var data = { "asig_codigo": asig_codigo, "peri_codigo": peri_codigo, "num_diario": numero }

    if (per_tipo !== "ESTUDIANTE") {

        data["est_codigo"] = document.getElementById("est_codigo").innerText

        var footer = document.getElementById("footer-diario");

        if (footer) {
            footer.remove()
        }

        document.getElementById("tema").disabled = true;
        document.getElementById("contenidos").disabled = true;
        document.getElementById("objetivos").disabled = true;
        document.getElementById("actividades").disabled = true;
        document.getElementById("estrategias").disabled = true;
        document.getElementById("resumen").disabled = true;
        document.getElementById("preg1").disabled = true;
        document.getElementById("preg2").disabled = true;
        document.getElementById("preg3").disabled = true;
        document.getElementById("preg4").disabled = true;

    }

    $.ajax({

        url: 'http://190.155.140.58/api/portafolio/getdiario',
        data: data,
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        type: "POST",
        success: function (data) {

            const { tema, contenidos, objetivos, actividades, estrategias, resumen, preg1, preg2, preg3, preg4 } = data.message

            document.getElementById("tema").value = tema
            document.getElementById("contenidos").value = contenidos
            document.getElementById("objetivos").value = objetivos
            document.getElementById("actividades").value = actividades
            document.getElementById("estrategias").value = estrategias
            document.getElementById("resumen").value = resumen
            document.getElementById("preg1").value = preg1
            document.getElementById("preg2").value = preg2
            document.getElementById("preg3").value = preg3
            document.getElementById("preg4").value = preg4


        }
        ,
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown)
            console.log(jqXHR)
            console.log(textStatus)
        }

    })


})



$('#archivo').on('show.bs.modal', function (event) {

    var button = $(event.relatedTarget)
    var titulo = button.data('titulo')
    var nombre_archivo = button.data('nombre')

    var tipo_archivo = button.data('tipo')

    var modal = $(this)
    const per_tipo = document.getElementById("per_tipo").innerText
    modal.find('.modal-title').text('ARCHIVO DE ' + titulo)

    modal.find('.modal-nombre_archivo').text(nombre_archivo)

    modal.find('.modal-archivo_nombre').text(nombre_archivo)
    modal.find('.modal-tipo_archivo').text(tipo_archivo)


    if (per_tipo !== "ESTUDIANTE") {

        var btn_eliminar = document.getElementById("btn_eliminar_archivo")

        if (btn_eliminar) {
            btn_eliminar.remove()
        }

    }




})



$('#informe').on('show.bs.modal', function () {

    const jwt = localStorage.getItem("jwt")
    const asig_codigo = document.getElementById("asig_codigo").innerText
    const peri_codigo = document.getElementById("peri_codigo").innerText
    const per_tipo = document.getElementById("per_tipo").innerText
    const informe_contenido = document.getElementById("informe_contenido")

    var data = { "asig_codigo": asig_codigo, "peri_codigo": peri_codigo }

    if (per_tipo !== "ESTUDIANTE") {

        data["est_codigo"] = document.getElementById("est_codigo").innerText

        var footer = document.getElementById("footer-informe");

        if (footer) {
            footer.remove()
        }

        informe_contenido.disabled = true;

    }

    $.ajax({

        url: 'http://190.155.140.58/api/portafolio/getinforme',
        data: data,
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        type: "POST",
        success: function (data) {

            const { contenido } = data.message

            informe_contenido.value = contenido

        }
        ,
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown)
            console.log(jqXHR)
            console.log(textStatus)
        }

    })


})



$('#expectativas').on('show.bs.modal', function () {

    const jwt = localStorage.getItem("jwt")
    const asig_codigo = document.getElementById("asig_codigo").innerText
    const peri_codigo = document.getElementById("peri_codigo").innerText
    const per_tipo = document.getElementById("per_tipo").innerText

    const expectativas_contenido = document.getElementById("expectativas_contenido")

    var data = { "asig_codigo": asig_codigo, "peri_codigo": peri_codigo }

    if (per_tipo !== "ESTUDIANTE") {

        data["est_codigo"] = document.getElementById("est_codigo").innerText

        var footer = document.getElementById("footer-expectativas");

        if (footer) {
            footer.remove()
        }

        expectativas_contenido.disabled = true;

    }

    $.ajax({

        url: 'http://190.155.140.58/api/portafolio/getexpectativas',
        data: data,
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        type: "POST",
        success: function (data) {

            const { contenido } = data.message

            expectativas_contenido.value = contenido

        }
        ,
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown)
            console.log(jqXHR)
            console.log(textStatus)
        }

    })


})
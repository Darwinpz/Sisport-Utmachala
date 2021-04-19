
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

            formData.append("fac_nombre", esquema.split(".")[0]);
            formData.append("car_nombre", esquema.split(".")[1]);
            formData.append("asig_identificador", identificador + periodo);
            formData.append("per_cedula", cedula);


        });

    }

});

$('#subir').on('show.bs.modal', function (event) {

    myDropzone.removeAllFiles();

    var button = $(event.relatedTarget)
    var titulo = button.data('titulo')
    var cantidad = button.data('cant')
    var size = button.data('size')
    var type = button.data('type')
    var paramName = button.data('parametro')
    var modal = $(this)

    modal.find('.modal-title').text('Subir ' + titulo)

    if (cantidad > 1) {

        modal.find('.modal-cant').text('Cantidad max: ' + cantidad + ' archivos simultáneos')

    } else {

        modal.find('.modal-cant').text('Cantidad max: ' + cantidad + ' archivo simultáneo')

    }


    modal.find('.modal-size').text('Tamaño max: ' + size + ' mb')
    modal.find('.modal-type').text('Formato: "' + type + '"')


    myDropzone.options.url = "http://localhost:4555/upload/" + titulo.toLowerCase();
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
    var tema = button.data('tema')
    var contenidos = button.data('contenidos')
    var objetivos = button.data('objetivos')

    var fin = button.data('fin')
    var modal = $(this)

    modal.find('.modal-title').text('DIARIO METACOGNITIVO ' + numero)

    var nombre = document.getElementById("asignatura_nombre")

    modal.find('.modal-materia').text(nombre.innerText + " - " + horas)
    modal.find('.modal-fecha').text(fecha)

    modal.find('.modal-periodo').text(inicio.split("T")[0] + " al " + fin.split("T")[0])

    modal.find('.modal-diario').text(numero)

    modal.find('.modal-tema input').val(tema)

    modal.find('.modal-contenidos input').val(contenidos)

    modal.find('.modal-objetivos input').val(objetivos)

})
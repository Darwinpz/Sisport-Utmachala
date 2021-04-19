
var myDropzone = new Dropzone("#myDropzone", {
    url: "/home/Upload",
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


    myDropzone.options.url = "/subir/" + titulo.toLowerCase();
    myDropzone.options.maxFiles = cantidad;
    myDropzone.options.maxFilesize = size;
    myDropzone.options.acceptedFiles = type;
    myDropzone.hiddenFileInput.accept = type;
    myDropzone.options.paramName = paramName;
    myDropzone.options.parallelUploads = cantidad;

})

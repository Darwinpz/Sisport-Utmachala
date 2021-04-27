$('#clave').on('show.bs.modal', function (event) {


    var button = $(event.relatedTarget)

    var per_codigo = button.data('per_codigo')

    var err = document.getElementById("error")


    if (err) {
        err.innerText = ""
    }

    document.getElementById("per_codigo").innerText = per_codigo


})

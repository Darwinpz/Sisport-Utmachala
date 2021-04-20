
$('#horario').on('show.bs.modal', function (event) {

    var button = $(event.relatedTarget)
    var asignatura = button.data('asignatura')

    var modal = $(this)

    modal.find('.modal-title').text('HORARIO DE CLASES: ' + asignatura)


})

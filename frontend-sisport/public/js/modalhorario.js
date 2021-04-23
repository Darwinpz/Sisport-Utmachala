
$('#horario').on('show.bs.modal', function (event) {

    var button = $(event.relatedTarget)
    var asignatura = button.data('asignatura')
    var asig_codigo = button.data('asig_codigo')
    var peri_codigo = button.data('peri_codigo')
    var asig_identificador = button.data('identificador')
    var carrera = button.data('carrera')
    var facultad = button.data('facultad')
    var sem_codigo = button.data('sem_codigo')

    var modal = $(this)

    modal.find('.modal-title').text('HORARIO DE CLASES: ' + asignatura)
    modal.find('.modal-asig_codigo').text(asig_codigo)
    modal.find('.modal-peri_codigo').text(peri_codigo)
    modal.find('.modal-identificador').text(asig_identificador)
    modal.find('.modal-facultad').text(facultad)
    modal.find('.modal-carrera').text(carrera)
    modal.find('.modal-sem_codigo').text(sem_codigo)

})
